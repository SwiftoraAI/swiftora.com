/* Local preview instrumentation only. preview.mjs injects this for ?qa=1.
   This file and axe are never copied to dist and make no outbound requests. */
(() => {
  'use strict';
  const reportElement = document.createElement('pre');
  reportElement.id = 'qa-results';
  reportElement.hidden = true;
  reportElement.setAttribute('aria-hidden', 'true');
  reportElement.dataset.status = 'running';
  document.body.appendChild(reportElement);

  const errors = [];
  const shifts = [];
  let lcp = null;
  const observers = [];
  window.addEventListener('error', event => {
    errors.push({ type: 'error', message: event.message ?? 'Resource load error', source: event.filename ?? event.target?.src ?? '', line: event.lineno ?? null });
  }, true);
  window.addEventListener('unhandledrejection', event => {
    errors.push({ type: 'unhandledrejection', message: String(event.reason?.message ?? event.reason) });
  });
  function observe(type, receive) {
    try {
      const observer = new PerformanceObserver(list => list.getEntries().forEach(receive));
      observer.observe({ type, buffered: true });
      observers.push(observer);
      return true;
    } catch { return false; }
  }
  const lcpSupported = observe('largest-contentful-paint', entry => {
    lcp = { startTime: entry.startTime, renderTime: entry.renderTime, loadTime: entry.loadTime, size: entry.size, url: entry.url, element: entry.element?.tagName ?? null };
  });
  const clsSupported = observe('layout-shift', entry => {
    if (!entry.hadRecentInput) shifts.push({ value: entry.value, startTime: entry.startTime });
  });
  const rect = element => {
    if (!element) return null;
    const box = element.getBoundingClientRect();
    return { x: box.x, y: box.y, width: box.width, height: box.height, documentY: box.y + window.scrollY };
  };
  const summarizeRule = rule => ({
    id: rule.id, impact: rule.impact, description: rule.description, help: rule.help,
    helpUrl: rule.helpUrl, tags: rule.tags,
    nodes: rule.nodes.map(node => ({ target: node.target, html: node.html, failureSummary: node.failureSummary ?? null })),
  });
  function clsSessionMaximum() {
    let maximum = 0, session = 0, sessionStart = 0, previous = 0;
    for (const shift of [...shifts].sort((a, b) => a.startTime - b.startTime)) {
      if (!session || shift.startTime - previous > 1000 || shift.startTime - sessionStart > 5000) {
        session = shift.value; sessionStart = shift.startTime;
      } else session += shift.value;
      previous = shift.startTime;
      maximum = Math.max(maximum, session);
    }
    return maximum;
  }

  async function collect() {
    await document.fonts?.ready;
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const report = {
      kind: 'Local instrumented browser diagnostics', timestamp: new Date().toISOString(),
      url: location.href,
      limitations: [
        'Axe is an automated check, not accessibility conformance or screen-reader testing.',
        'Performance observations cover this instrumented initial page load only, include QA script overhead, and are not field data or p75 Core Web Vitals.',
        'Control dimensions are measurements; target-size exceptions and spacing require manual review.',
        'Error listeners started when the QA script ran; earlier errors may not be included.',
      ],
      browser: { userAgent: navigator.userAgent, devicePixelRatio: window.devicePixelRatio, language: navigator.language },
      viewport: { width: window.innerWidth, height: window.innerHeight },
      preferences: { reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches, dark: matchMedia('(prefers-color-scheme: dark)').matches },
      layout: {
        documentClientWidth: document.documentElement.clientWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        heading: rect(document.querySelector('main h1') ?? document.querySelector('h1')),
        primaryAction: rect(document.querySelector('main a[href="https://apps.apple.com/us/app/swiftora/id6760380351"]')),
      },
      controls: [...document.querySelectorAll('a[href], button, input, select, textarea, summary')].map(element => ({
        tag: element.tagName, id: element.id, label: (element.getAttribute('aria-label') ?? element.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 140),
        href: element.getAttribute('href'), rect: rect(element),
      })).filter(control => control.rect.width > 0 && control.rect.height > 0),
      images: [...document.images].map(image => ({ src: image.currentSrc || image.src, complete: image.complete, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight, alt: image.alt })),
    };
    try {
      if (!window.axe) throw new Error('Local axe-core failed to load.');
      const axeResult = await window.axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
      });
      report.accessibility = {
        tool: 'axe-core', version: window.axe.version,
        scope: 'WCAG 2 A/AA, 2.1 A/AA, 2.2 AA tagged rules',
        violations: axeResult.violations.map(summarizeRule),
        incomplete: axeResult.incomplete.map(summarizeRule),
        passes: axeResult.passes.map(rule => rule.id),
        inapplicable: axeResult.inapplicable.map(rule => rule.id),
      };
    } catch (error) {
      report.accessibility = { error: String(error.message ?? error) };
    }
    const navigation = performance.getEntriesByType('navigation')[0];
    report.performance = {
      navigation: navigation ? {
        type: navigation.type, duration: navigation.duration, domContentLoadedEventEnd: navigation.domContentLoadedEventEnd,
        loadEventEnd: navigation.loadEventEnd, responseStart: navigation.responseStart, responseEnd: navigation.responseEnd,
        transferSize: navigation.transferSize, encodedBodySize: navigation.encodedBodySize,
      } : null,
      resources: performance.getEntriesByType('resource').map(entry => ({
        name: entry.name, initiatorType: entry.initiatorType, startTime: entry.startTime, duration: entry.duration,
        transferSize: entry.transferSize, encodedBodySize: entry.encodedBodySize, decodedBodySize: entry.decodedBodySize,
        responseStatus: entry.responseStatus ?? null,
      })),
      lcpObservation: { supported: lcpSupported, entry: lcp, status: lcp ? 'observed for this initial load' : 'not observed' },
      clsObservation: { supported: clsSupported, sessionMaximum: clsSupported ? clsSessionMaximum() : null, entries: shifts },
      inp: { status: 'not measured' },
    };
    report.errors = errors;
    reportElement.textContent = JSON.stringify(report, null, 2);
    reportElement.dataset.status = 'complete';
    observers.forEach(observer => observer.disconnect());
  }
  function start() {
    setTimeout(() => collect().catch(error => {
      reportElement.textContent = JSON.stringify({ error: String(error.message ?? error), errors });
      reportElement.dataset.status = 'failed';
    }), 750);
  }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
})();
