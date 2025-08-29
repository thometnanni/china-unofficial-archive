export const collators = {
	en: new Intl.Collator('en', { sensitivity: 'base', numeric: true }),
	zhPinyin: new Intl.Collator('zh-u-co-pinyin', { sensitivity: 'base', numeric: true }),
	zhStroke: new Intl.Collator('zh-u-co-stroke', { sensitivity: 'base', numeric: true })
};
