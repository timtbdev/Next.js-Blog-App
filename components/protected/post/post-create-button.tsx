// 'use client';
// import React, { FC, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//     AlertDialog,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogHeader,
//     AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import { Plus as AddIcon, Loader2 as SpinnerIcon } from 'lucide-react';
// import { toast } from 'react-hot-toast';
// import { postConfig } from '@/config/post';

// const PostCreateButton = () => {
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     async function createPost() {
//         setIsLoading(true);

//         //    const response = await fetch(apiUrl, {
//         //        method: 'POST',
//         //        headers: {
//         //            'Content-Type': 'application/json',
//         //        },
//         //        body: JSON.stringify({
//         //            title: `Untitled ${title}`,
//         //        }),
//         //    });

//         setIsLoading(false);

//         if (!response?.ok) {
//             toast.success(myPostConfig.errorCreate);
//         }

//         toast.success(myPostConfig.successCreate);

//         const item = await response.json();

//         // This forces a cache invalidation.
//         router.refresh();

//         router.push('/editor/posts/' + item.id);
//     }

//     return <div>my-posts-create-button</div>;
// };

// export default PostCreateButton;
