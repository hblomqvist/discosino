/**
 * @license
 * MIT License
 *
 * Copyright (c) 2017-2020 dirigeants
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { SANITIZER_SUFFIXES } from '#config';
import { regExpEsc } from '@sapphire/utilities';

let sensitivePattern: RegExp;

const secrets = new Set<string>();

for (const [key, value] of Object.entries(process.env)) {
	if (!value) continue;
	if (SANITIZER_SUFFIXES.some((suffix) => key.endsWith(suffix))) secrets.add(value);
}

if (secrets.size) sensitivePattern = new RegExp([...secrets].map(regExpEsc).join('|'), 'gi');

export function sanitize(text: string) {
	if (!sensitivePattern) return text;

	return text.replace(sensitivePattern, '[REDACTED]');
}
