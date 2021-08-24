import romaji_hira from './romaji-hira-table'
import convert from './romaji-hira-convert'

// ひらがな一覧
const hira = (table) => {
	let text = ''
	Object.keys(table).forEach((key) => {
		const next = table[key]
		text += (typeof next === 'string') ? next : hira(next)
	})
	return text
}
// ローマ字一覧
const roma = (table, beforeKey = '') => {
	let text = ''
	Object.keys(table).forEach((key) => {
		const next = table[key]
		const currentInput = beforeKey + key
		text += (typeof next === 'string') ? currentInput : roma(next, currentInput)
	})
	return text
}
// object の構造のテスト
if (hira(romaji_hira) !== convert(roma(romaji_hira))) {
	console.log('error')
}
// テスト
const test = (input, expected) => {
	const result = convert(input)
	if (expected !== result) {
		console.log(`${input} → ${result}`)
	}
}
// テスト一覧
test('x'   , 'x'   )
test('xx'  , 'xx'  )
test('xxx' , 'xxx' )
test('xxxx', 'xxxx')
test('abcdefg', 'あbcでfg')
// n → ん
test('ronbunn', 'ろんぶん')
test('ronbun' , 'ろんぶn' )
// 促音
test('ryukku'    , 'りゅっく'    )
test('nappusakku', 'なっぷさっく')
// ひらがな混合
test('maeひらがなato', 'まえひらがなあと')
