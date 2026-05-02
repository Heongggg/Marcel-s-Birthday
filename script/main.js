// trigger to play music in the background with sweetalert
window.addEventListener("load", () => {
  Swal.fire({
    title: "Mau puter musik ga Cel?",
    icon: "haloo",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Mauu",
    cancelButtonText: "Gausaa",
  }).then((result) => {
    if (result.isConfirmed) {
      document.querySelector(".song").play();
      animationTimeline();
    } else {
      animationTimeline();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const dayElement = document.getElementById("day");
  const monthElement = document.getElementById("month");
  const yearElement = document.getElementById("year");
  const ageElement = document.getElementById("age");

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];

  const targetDay = 9;
  const targetMonthIndex = 5; // Juni = index 5
  const targetYear = 2006;
  const birthYear = 2006;

  let currentDay = 1;
  let currentMonthIndex = 0;
  let currentYear = birthYear;
  let currentAge = 0;

  const interval = setInterval(() => {
    dayElement.textContent = currentDay;
    monthElement.textContent = months[currentMonthIndex];
    yearElement.textContent = currentYear;
    ageElement.textContent = currentAge;

    if (currentDay < targetDay) {
      currentDay++;
    } else if (currentMonthIndex < targetMonthIndex) {
      currentDay = targetDay;
      currentMonthIndex++;
    } else {
      // Hitung umur berdasarkan tahun sekarang
      const now = new Date();
      currentAge = now.getFullYear() - birthYear;
      ageElement.textContent = currentAge;
      clearInterval(interval);
    }
  }, 200);
});

const animationTimeline = () => {
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  // Pecah setiap paragraf hbd-chatbox jadi span per karakter
  const chatboxParagraphs = document.querySelectorAll(".hbd-chatbox");
  chatboxParagraphs.forEach((p) => {
    p.innerHTML = `<span>${p.innerHTML.split("").join("</span><span>")}</span>`;
  });

  hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;

  const textBox = document.querySelector(".text-box");
  let userScrolled = false;
  textBox.addEventListener("touchstart", () => { userScrolled = true; });

  const ideaTextTrans = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
  const ideaTextTransLeave = { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" };

  const tl = new TimelineMax();

  tl.to(".container", 0.6, { visibility: "visible" })
    .from(".one", 0.9, { opacity: 0, y: 10 })
    .from(".two", 0.9, { opacity: 0, y: 10 })
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=3.5")
    .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
    .from(".three", 0.7, { opacity: 0, y: 10 })
    .to(".three", 0.7, { opacity: 0, y: 10 }, "+=3")
    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 });

  // Animasi ngetik tiap paragraf satu-satu, kecepatan 0.03 = natural
  chatboxParagraphs.forEach((p, i) => {
    tl.staggerTo(p.querySelectorAll("span"), 1.5, {
      visibility: "visible",
      onUpdate: function() {
        if (!userScrolled) {
          textBox.scrollTop = textBox.scrollHeight;
        }
      }
    }, 0.03);

    // Jeda kecil antar paragraf biar natural
    if (i < chatboxParagraphs.length - 1) {
      tl.to({}, 0.4, {});
    }
  });

  tl.to(".fake-btn", 0.1, { backgroundColor: "#ff8fab" }, "+=1.5")
    .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=1")
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2, x: 10,
      backgroundColor: "rgb(21, 161, 237)", color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-5", 0.7, {
      rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0,
    }, "+=1.5")
    .to(".idea-5 span", 0.7, { rotation: 90, x: 8 }, "+=1.4")
    .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2")
    .staggerFrom(".idea-6 span", 0.8, {
      scale: 3, opacity: 0, rotation: 15, ease: Expo.easeOut,
    }, 0.2)
    .staggerTo(".idea-6 span", 0.8, {
      scale: 3, opacity: 0, rotation: -15, ease: Expo.easeOut,
    }, 0.2, "+=1.5")
    .staggerFromTo(".baloons img", 2.5,
      { opacity: 0.9, y: 1400 },
      { opacity: 1, y: -1000 },
      0.2
    )
    .from(".profile-picture", 0.5, {
      scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45,
    }, "-=2")
    .from(".hat", 0.5, { x: -100, y: 350, rotation: -180, opacity: 0 })
    .staggerFrom(".wish-hbd span", 0.7, {
      opacity: 0, y: -50, rotation: 150, skewX: "30deg",
      ease: Elastic.easeOut.config(1, 0.5),
    }, 0.1)
    .staggerFromTo(".wish-hbd span", 0.7,
      { scale: 1.4, rotationY: 150 },
      { scale: 1, rotationY: 0, color: "#ff69b4", ease: Expo.easeOut },
      0.1, "party"
    )
    .from(".wish h5", 0.5, { opacity: 0, y: 10, skewX: "-15deg" }, "party")
    .staggerTo(".eight svg", 1.5, {
      visibility: "visible", opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.4,
    }, 0.3)
    .to(".six", 0.5, { opacity: 0, y: 30, zIndex: "-1" })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(".last-smile", 0.5, { rotation: 90 }, "+=1");

  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    userScrolled = false;
    tl.restart();
  });
};
