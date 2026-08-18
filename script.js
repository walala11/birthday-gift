const chapters = [
  {
    id: "landscape", number: "01", title: "风景", subtitle: "山川自有回声", count: 11,
    description: "从雾里的树林，到雪线之上的群峰。镜头没有急着解释远方，只是把光落下时的层次，一层一层留下来。",
    closing: "辽阔之外，也有一株植物在暮色里安静地站着。",
    notes: { 0: "雾让远处退后，也让眼前的树更清晰。", 5: "群山沉默，光替它们说话。", 10: "风景不一定宏大，有时只是天色暗下来之前的一次抬头。" }
  },
  {
    id: "architecture", number: "02", title: "建筑", subtitle: "城市的线条与呼吸", count: 17,
    description: "高楼、旧巷、轨道、桥与穿行的人。城市从来不只由建筑组成，光线经过它，生活经过它，它才有了真正的表情。",
    closing: "秩序是城市的骨架，偶然经过的人让它开始呼吸。",
    notes: { 0: "白昼把楼宇的距离照得清清楚楚，街道仍在不断向前。", 6: "列车切开旧城与新城，也把两个时间放在同一张照片里。", 9: "夕阳抵达钢索和楼群时，城市忽然有了温度。", 15: "门洞框住的不是景点，是一段正在发生的日常。" }
  },
  {
    id: "portrait", number: "03", title: "人像", subtitle: "人与空间相遇", count: 10,
    description: "有人直面镜头，有人在巨大的空间里伸展身体。人物和环境互相回应，一次快门便留下了姿态，也留下了当时的气氛。",
    closing: "真正被记录下来的，不只是面孔，还有那一刻独有的状态。",
    notes: { 0: "倾斜的画面让随意的一瞬，带上了属于街头的节奏。", 3: "当人物被放进巨大的圆形空间，尺度本身也成为叙事。", 7: "倒影把一个动作延长，也把安静放大。" }
  },
  {
    id: "campus", number: "04", title: "校园", subtitle: "熟悉之地，也有未被察觉的光", count: 6,
    description: "雨后的地面、深夜的树影、路灯照亮的一小段路。越熟悉的地方，越需要认真观看，才会发现它从未真正重复。",
    closing: "日常并不普通，只是常常走得太快，没有停下来看看。",
    notes: { 0: "上下两块黑暗之间，一棵树守着自己的倒影。", 2: "落叶和影子都很轻，却共同证明这束光曾经来过。", 5: "同一条路褪去颜色以后，雨水留下了更长的回声。" }
  },
  {
    id: "stars", number: "05", title: "星空", subtitle: "在漫长曝光里，时间留下轨迹", count: 4,
    description: "当快门打开得足够久，肉眼看不见的时间开始显形。星光划过夜空，远方不再只是距离，也成了一段可以被保存的时间。",
    closing: "这一章没有结束。下一次抬头，新的光还会抵达。",
    notes: { 0: "星星绕着看不见的中心移动，夜晚因此有了形状。", 2: "列车与星轨短暂相遇，两种速度留在同一片夜色里。", 3: "黑暗不是空无，它只是让微小的光变得清楚。" }
  }
];

const pathFor = (chapter, image) => `gallery/${String(chapter + 1).padStart(2, "0")}/${String(image + 1).padStart(2, "0")}.webp`;
const index = document.querySelector("#chapter-index");
const chaptersRoot = document.querySelector("#chapters");

chapters.forEach((chapter, chapterIndex) => {
  index.insertAdjacentHTML("beforeend", `<a href="#${chapter.id}"><span>${chapter.number}</span><strong>${chapter.title}</strong><small>${String(chapter.count).padStart(2, "0")} 张</small></a>`);

  const photos = Array.from({ length: chapter.count }, (_, imageIndex) => `
    <figure class="photo reveal">
      <button type="button" data-chapter="${chapterIndex}" data-image="${imageIndex}" aria-label="查看${chapter.title}章节第${imageIndex + 1}张照片">
        <img src="${pathFor(chapterIndex, imageIndex)}" alt="${chapter.title}摄影作品 ${imageIndex + 1}" loading="${chapterIndex === 0 && imageIndex < 2 ? "eager" : "lazy"}">
        <span class="photo__count">${String(imageIndex + 1).padStart(2, "0")} / ${String(chapter.count).padStart(2, "0")}</span>
      </button>
      ${chapter.notes[imageIndex] ? `<figcaption>${chapter.notes[imageIndex]}</figcaption>` : ""}
    </figure>`).join("");

  chaptersRoot.insertAdjacentHTML("beforeend", `
    <section class="chapter chapter--${chapter.id}" id="${chapter.id}">
      <div class="chapter__heading reveal">
        <span class="chapter__number">${chapter.number}</span>
        <div><p class="eyebrow">CHAPTER ${chapter.number}</p><h2>${chapter.title}</h2><h3>${chapter.subtitle}</h3></div>
        <p>${chapter.description}</p>
      </div>
      <div class="gallery">${photos}</div>
      <p class="chapter__closing reveal">${chapter.closing}</p>
    </section>`);
});

const entrance = document.querySelector(".entrance");
const enter = () => { entrance.classList.add("entrance--gone"); document.body.style.overflow = ""; };
entrance.addEventListener("click", enter);
entrance.addEventListener("wheel", enter, { once: true, passive: true });
entrance.addEventListener("touchmove", enter, { once: true, passive: true });
entrance.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") enter(); });
document.body.style.overflow = "hidden";

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add("is-visible");
}), { threshold: .08 });
document.querySelectorAll(".reveal").forEach(node => observer.observe(node));

const progress = document.querySelector(".progress");
addEventListener("scroll", () => {
  const total = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${total > 0 ? scrollY / total * 100 : 0}%`;
}, { passive: true });

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxMeta = lightbox.querySelector(".lightbox__meta");
let current = { chapter: 0, image: 0 };

function showImage(chapter, image) {
  current = { chapter, image };
  const item = chapters[chapter];
  lightboxImage.src = pathFor(chapter, image);
  lightboxImage.alt = `${item.title}摄影作品`;
  lightboxMeta.innerHTML = `${item.number} · ${item.title}<span>${String(image + 1).padStart(2, "0")} / ${String(item.count).padStart(2, "0")}</span>`;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}
function move(direction) {
  const count = chapters[current.chapter].count;
  showImage(current.chapter, (current.image + direction + count) % count);
}
document.querySelectorAll(".photo button").forEach(button => button.addEventListener("click", () => showImage(Number(button.dataset.chapter), Number(button.dataset.image))));
lightbox.querySelector(".lightbox__close").addEventListener("click", () => { lightbox.hidden = true; document.body.style.overflow = ""; });
lightbox.querySelector(".lightbox__nav--prev").addEventListener("click", () => move(-1));
lightbox.querySelector(".lightbox__nav--next").addEventListener("click", () => move(1));

const letter = document.querySelector("#letter");
document.querySelector("#open-letter").addEventListener("click", () => { letter.hidden = false; document.body.style.overflow = "hidden"; });
document.querySelector("#close-letter").addEventListener("click", () => { letter.hidden = true; document.body.style.overflow = ""; });

addEventListener("keydown", event => {
  if (event.key === "Escape") {
    lightbox.hidden = true; letter.hidden = true;
    if (entrance.classList.contains("entrance--gone")) document.body.style.overflow = "";
  }
  if (!lightbox.hidden && event.key === "ArrowLeft") move(-1);
  if (!lightbox.hidden && event.key === "ArrowRight") move(1);
});
