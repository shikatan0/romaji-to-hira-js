import './test'
import convert from './romaji-hira-convert'

const input = document.getElementById('input') as HTMLTextAreaElement
const result = document.getElementById('result')
input.addEventListener('input', () => {
	result.textContent = convert(input.value)
})
