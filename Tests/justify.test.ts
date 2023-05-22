import {justify} from "../src/utils/justify"

const input = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis mollitia quibusdam dolorem. 
minima vitae, consequatur dolor illum soluta, at enim officia possimus rerum quis qui dolore quaerat quas itaque molestias.`;
const output=`Lorem  ipsum  dolor  sit amet consectetur adipisicing elit. Perferendis mollitia
quibusdam dolorem.
minima  vitae,  consequatur  dolor  illum soluta, at enim officia possimus rerum
quis qui dolore quaerat quas itaque molestias.`;





describe('justify Unit Test Suites', () => {
    it('should be in test env', () => {
        expect(justify(input,80)).toBe(output)
    })
})