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
        <div className="p-5 md:space-x-5 max-md:space-y-5 md:p-10 flex max-md:flex-col items-center md:items-start   justify-center  border-black">
            {/* Sticky olan element */}
            
                <img src={post && post.image} className="object-contain md:sticky top-0  max-h-[500px]
                   rounded-xl flex items-center justify-center  bg-gray-200 border-red-700"
                   alt="" />
           

            {/* İçerik kısmı */}
            <div className="md:w-2/3 w-full min-h-[500px]  flex flex-col justify-between space-y-5   border-blue-700">
                
            <h1 className="text-center w-full  uppercase text-3xl  p-3 font-semibold   border-blue-700">
                    {post && post.title}
                </h1>

                <div
                    className="p-3  mx-auto w-full post-content   border-blue-700"
                    dangerouslySetInnerHTML={{ __html: post && post.content }}
                />

                <div className="flex justify-between p-3 border-b-2 border-blue-600 dark:border-white mx-auto w-full max-w-2xl text-xs">
                    <span>Yayınlama Tarihi: {post && new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="italic">Güncelleme Tarihi: {post && new Date(post.updatedAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}

export default PostPage;
