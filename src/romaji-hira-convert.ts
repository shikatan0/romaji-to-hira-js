import romaji_hira from './romaji-hira-table'

export default (input: string) => {
	let result = ''  // 変換結果の出力文字列
	let state = romaji_hira  // 解析の状態
	let pending = ''  // 変換保留中の文字
	let dual = false  // 同じ文字が連続して入力されたか
	let offset = 0  // 入力文字列内での位置
	const size = input.length
	while (offset < size) {
		const char = input[offset]
		// 現在の解析状態で一致する文字が存在する場合
		if (char in state) {
			const value = state[char]
			// 変換確定
			if (typeof value === 'string') {
				if (dual) {
					result += 'っ'
					dual = false
				}
				result += value
				pending = ''
				state = romaji_hira
			}
			// 変換途中
			else {
				state = value
				pending = char
			}
			offset += 1
			continue
		}
		// 現在の解析状態で一致する文字が存在しない場合
		// 連続する同じ文字に続けて入力された文字の場合
		if (dual) {
			result += pending + pending
			pending = ''
			state = romaji_hira
			dual = false
			continue
		}
		// 直前の文字との厳密等価判定
		switch (pending) {
		case char:
			dual = true
			state = romaji_hira
			continue
		case 'n':
			result += 'ん'
			pending = ''
			state = romaji_hira
			continue
		case '':
			result += char
			offset += 1
			continue
		}
		// 該当なし
		result += pending
		pending = ''
		state = romaji_hira
		continue
	}
	// 末尾の未確定な入力
	if (dual) {
		pending += pending
	}
	return result + pending
}
