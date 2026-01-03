import { describe, it, expect, beforeEach } from 'vitest';
import * as PostService from './post.service.js';

describe('Post Service', () => {

    beforeEach(() => {
        PostService.reset();
    });

    it('should find a post by id', () => {
        const post = PostService.getById(1);
        expect(post).toBeDefined();
        expect(post.id).toBe(1);
    });

    it('should throw an error if post not found', () => {
        expect(() => PostService.getById(999)).toThrow('Post not found');
    });

    it('should create a new post', () => {
        const newPostData = { title: 'New Post', content: 'Content here' };
        const createdPost = PostService.create(newPostData);
        expect(createdPost.id).toBe(2);
        expect(createdPost.title).toBe(newPostData.title);
    });

    it('should update an existing post', () => {
        const updatedData = { title: 'Updated Title' };
        const updatedPost = PostService.update(1, updatedData);
        expect(updatedPost.title).toBe('Updated Title');
        expect(updatedPost.content).toBe('...');
    });

    it('should throw an error when updating a non-existent post', () => {
        expect(() => PostService.update(999, {})).toThrow('Post not found');
    });

    it('should remove a post', () => {
        PostService.remove(1);
        expect(() => PostService.getById(1)).toThrow('Post not found');
    });

    it('should throw an error when removing a non-existent post', () => {
        expect(() => PostService.remove(999)).toThrow('Post not found');
    });
});