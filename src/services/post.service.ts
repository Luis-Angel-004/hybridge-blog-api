interface Post {
    id: number;
    title: string;
    content: string;
}
type PostData = Omit<Post, 'id'>;

export let posts: Post[] = [{ id: 1, title: 'Hello World', content: '...' }];
let nextId = 2;

export const reset = () => {
    posts = [{ id: 1, title: 'Hello World', content: '...' }];
    nextId = 2;
};

export const getAll = (): Post[] => posts;

export const getById = (id: number): Post => {
    const post = posts.find(p => p.id === id);
    if (!post) throw new Error('Post not found');
    return post;
};

export const create = (data: { title: string; content: string }): Post => {
    if (!data.title || !data.content) throw new Error('Title and content are required');
    const newPost = { id: nextId++, ...data };
    posts.push(newPost);
    return newPost;
};

export const update = (id: number, data: Partial<PostData>): Post => {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) throw new Error('Post not found');

    const updatedPost = { ...posts[postIndex], ...data };
    posts[postIndex] = updatedPost;
    return updatedPost;
};

export const remove = (id: number): void => {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) throw new Error('Post not found');
    posts.splice(postIndex, 1);
};