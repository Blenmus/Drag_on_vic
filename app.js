gsap.registerPlugin(ScrollTrigger);

gsap.to(".square", {
    scrollTrigger: {
        trigger: ".square",
        start: "top center",
        end: "top 30%",
        scrub: 1,
        markers: {
            startColor: "purple",
            endColor: "fuchsia",
            fontSize: "3rem"
        }
    },
    x:400,
    rotation: 360,
    ease: "none",
    duration: 5
})