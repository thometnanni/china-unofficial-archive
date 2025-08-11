import { writable } from "svelte/store";
import { browser } from "$app/environment";

function getDefaultLang() {
  if (browser) {
    // console.log(navigator, navigator.language);
    const saved = localStorage.getItem("lang");
    if (saved) return saved;

    const browserLang = navigator.language;
    if (browserLang?.startsWith("zh")) return "zh";
  }
  return "en";
}

export const lang = writable(getDefaultLang());

if (browser) {
  lang.subscribe((value) => {
    localStorage.setItem("lang", value);
  });
}

export const translations = {
  en: {
    title: "China Unofficial Archive",
    switch_to_ch: "切换中文",
    all: "All",
    creator: "Creator",
    era: "Era",
    type: "Type",
    theme: "Theme",
    search_placeholder: "Search all fields...",
    loading: "Loading...",
    no_results: "No results found.",
    view_details: "View details",
    untitled: "(Untitled)",
    no_description: "No description available.",
  },
  zh: {
    title: "民间档案馆",
    switch_to_ch: "Switch to English",
    all: "全部",
    creator: "创作者",
    era: "时代",
    type: "类型",
    theme: "主题",
    search_placeholder: "搜索全部字段...",
    loading: "加载中...",
    no_results: "未找到结果。",
    view_details: "查看详情",
    untitled: "(无标题)",
    no_description: "暂无描述。",
  },
};

export function t(key, l) {
  return translations[l]?.[key] || key;
}
