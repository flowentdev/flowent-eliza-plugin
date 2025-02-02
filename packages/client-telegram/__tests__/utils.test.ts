import { describe, it, expect } from 'vitest';
import { cosineSimilarity, escapeMarkdown, splitMessage } from '../src/utils';

describe('Telegram Utils', () => {
    describe('cosineSimilarity', () => {
        it('should calculate similarity between two texts', () => {
            const text1 = 'hello world';
            const text2 = 'hello there';
            const similarity = cosineSimilarity(text1, text2);
            expect(similarity).toBeGreaterThan(0);
            expect(similarity).toBeLessThan(1);
        });

        it('should handle identical texts', () => {
            const text = 'hello world test';
            expect(cosineSimilarity(text, text)).toBeCloseTo(1, 5);
        });

        it('should handle completely different texts', () => {
            const text1 = 'hello world';
            const text2 = 'goodbye universe';
            expect(cosineSimilarity(text1, text2)).toBe(0);
        });

        it('should handle three-way comparison', () => {
            const text1 = 'hello world';
            const text2 = 'hello there';
            const text3 = 'hi world';
            const similarity = cosineSimilarity(text1, text2, text3);
            expect(similarity).toBeGreaterThan(0);
            expect(similarity).toBeLessThan(1);
        });
    });

    describe('escapeMarkdown', () => {
        it('should escape markdown special characters', () => {
            const input = '*bold* _italic_ `code`';
            const escaped = escapeMarkdown(input);
            expect(escaped).toBe('\\*bold\\* \\_italic\\_ \\`code\\`');
        });

        it('should handle text without special characters', () => {
            const input = 'Hello World 123';
            expect(escapeMarkdown(input)).toBe(input);
        });

        it('should handle empty string', () => {
            expect(escapeMarkdown('')).toBe('');
        });
    });

    describe('splitMessage', () => {
        it('should not split message within limit', () => {
            const message = 'Hello World';
            const chunks = splitMessage(message, 4096);
            expect(chunks).toEqual(['Hello World']);
        });

        it('should handle empty string', () => {
            const chunks = splitMessage('');
            expect(chunks).toEqual([]);
        });

        it('should keep message intact if shorter than maxLength', () => {
            const message = 'Hello World';
            const chunks = splitMessage(message, 6);
            expect(chunks).toEqual(['Hello World']);
        });
    });
});
