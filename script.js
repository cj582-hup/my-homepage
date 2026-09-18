// 个人主页交互脚本：移动端菜单、导航高亮、页脚年份
(function () {
  "use strict";

  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));

  // ---- 移动端汉堡菜单 ----
  function closeMenu() {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // 点击任意导航链接后收起菜单（锚点跳转由浏览器原生完成）
  links.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // ---- 滚动时高亮当前区块对应的导航项 ----
  var sections = Array.prototype.slice.call(
    document.querySelectorAll("section[id], header[id]")
  );
  var NAV_LINE = 120; // 距视口顶部超过该距离的最后一个区块视为当前区块

  function updateActiveLink() {
    var currentId = sections.length ? sections[0].id : null;
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= NAV_LINE) currentId = section.id;
    });
    // 已滚到页面底部时（最后一个区块顶部可能到不了判定线），高亮最后一个区块
    var atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom && sections.length) currentId = sections[sections.length - 1].id;
    if (currentId) {
      links.forEach(function (link) {
        var isActive = link.getAttribute("href") === "#" + currentId;
        link.classList.toggle("active", isActive);
      });
    }
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateActiveLink();
      ticking = false;
    });
  }, { passive: true });

  updateActiveLink();

  // ---- 页脚年份自动更新 ----
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
