import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function PostPage() {
    const { postSlug } = useParams();
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    toast.error(data.message);
                    return;
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };
        fetchPost();
    }, [postSlug]);

    useEffect(() => {
        try {
            const fetchRecentPosts = async () => {
                const res = await fetch(`/api/post/getposts?limit=3`);
                const data = await res.json();
                if (res.ok) {
                    setRecentPosts(data.posts);
                }
            };
            fetchRecentPosts();
        } catch (error) {
            toast.error(error.message);
        }
    }, []);

    return (
        <div className="min-h-screen  p-10 flex max-md:flex-col items-center justify-center  border-black">
            {/* Sticky olan element */}
            
                <img src={post && post.image} className="object-contain  h-1/2  w-1/3 
                  flex items-center justify-center  border-red-700" alt="" />
           

            {/* İçerik kısmı */}
            <div className="w-2/3 min-h-[500px] flex flex-col justify-around   p-4 border-blue-700">
                <h1 className="text-center uppercase text-3xl lg:text-4xl font-semibold">
                    {post && post.title}
                </h1>

                <div
                    className="p-3 max-w-2xl mx-auto w-full post-content"
                    dangerouslySetInnerHTML={{ __html: post && post.content }}
                />

                <div className="flex justify-between p-3 border-b-2 border-blue-600 dark:border-white mx-auto w-full max-w-2xl text-xs">
                    <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="italic">{post && (post.content.length / 1000).toFixed(0)} mins read</span>
                </div>
            </div>
        </div>
    );
}

export default PostPage;
