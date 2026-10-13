export function startGalaxyLightning(card: HTMLElement, svg: SVGSVGElement) {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const [main, branch] = svg.querySelectorAll("path");
  let next: ReturnType<typeof setTimeout>;
  let finish: ReturnType<typeof setTimeout>;

  function stop() {
    clearTimeout(next);
    clearTimeout(finish);
    card.classList.remove("strike");
    svg.classList.remove("on");
  }

  function strike() {
    if (motion.matches) return;
    const points = [{ x: 50, y: 0 }];
    while (points.at(-1)!.y < 160) {
      const previous = points.at(-1)!;
      points.push({
        x: Math.max(18, Math.min(82, previous.x + (Math.random() - .5) * 36)),
        y: Math.min(160, previous.y + 10 + Math.random() * 14),
      });
    }
    main.setAttribute("d", points.map((point, i) => `${i ? "L" : "M"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" "));
    const origin = points[Math.floor(points.length / 3)];
    branch.setAttribute("d", `M${origin.x} ${origin.y} l22 16 -9 5 20 20`);
    svg.classList.add("on");
    card.classList.add("strike");
    finish = setTimeout(() => {
      svg.classList.remove("on");
      card.classList.remove("strike");
    }, 220);
    next = setTimeout(strike, 3000 + Math.random() * 4000);
  }

  function update() {
    stop();
    if (!motion.matches) next = setTimeout(strike, 1200);
  }
  update();
  motion.addEventListener("change", update);
  return () => {
    stop();
    motion.removeEventListener("change", update);
  };
}
