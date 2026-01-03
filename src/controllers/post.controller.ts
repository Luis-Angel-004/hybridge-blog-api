import type { Request, Response } from 'express';
import * as PostService from '../services/post.service.js';

export const getAllPosts = (req: Request, res: Response) => {
    const posts = PostService.getAll();
    res.status(200).json(posts);
};

export const getPostById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        const post = PostService.getById(id);
        res.status(200).json(post);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = (req: Request, res: Response) => {
    try {
        const post = PostService.create(req.body);
        res.status(201).json(post);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updatePost = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        const updatedPost = PostService.update(id, req.body);
        res.status(200).json(updatedPost);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const deletePost = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        PostService.remove(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};