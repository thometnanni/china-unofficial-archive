export const collators = {
	en: new Intl.Collator('en', { sensitivity: 'base', numeric: true }),
	zhPinyin: new Intl.Collator('zh-Hans-u-co-pinyin', { sensitivity: 'base' }),
	zhStroke: new Intl.Collator('zh-Hans-u-co-stroke', { sensitivity: 'base' })
};
