import { Comment } from '@/types/models';
import { Textarea } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { debounce } from 'lodash';
import {
    CheckCircleIcon,
    HeartIcon,
    MessageCircleIcon,
    SendIcon,
    ThumbsDownIcon,
    Trash2Icon,
    XCircleIcon,
} from 'lucide-react';
import { Variants } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';

const commentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3 },
    },
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

interface CommentSectionProps {
    type: 'idol' | 'group';
    id: number;
    comments: Comment[];
}

const NotificationMessage = ({
    status,
    message,
}: {
    status: string;
    message: string;
}) => {
    const isError = status === 'error';

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={clsx(
                'rounded-xl p-4 shadow-lg backdrop-blur-md',
                isError
                    ? 'bg-red-500/10 text-red-600 dark:text-red-400'
                    : 'bg-green-500/10 text-green-600 dark:text-green-400',
            )}
        >
            <div className="flex items-center gap-2">
                {isError ? (
                    <XCircleIcon className="h-5 w-5" />
                ) : (
                    <CheckCircleIcon className="h-5 w-5" />
                )}
                <p className="text-sm font-medium">{message}</p>
            </div>
        </motion.div>
    );
};

export default function CommentSection({
    type,
    id,
    comments,
}: CommentSectionProps) {
    const { auth, flash } = usePage().props;
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [likedComments, setLikedComments] = useState<Record<number, boolean>>(
        {},
    );
    const [dislikedComments, setDislikedComments] = useState<
        Record<number, boolean>
    >({});

    const createForm = useForm({
        type,
        id,
        content: '',
    });

    const deleteForm = useForm();
    const likeForm = useForm();
    const dislikeForm = useForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        createForm.post(route('comments.store'), {
            preserveScroll: true,
            onSuccess: () => {
                createForm.reset('content');
            },
        });
    };

    const handleDelete = (commentId: number) => {
        setDeletingId(commentId);

        deleteForm.delete(route('comments.destroy', { comment: commentId }), {
            preserveScroll: true,
            onFinish: () => setDeletingId(null),
        });
    };

    const handleLike = useCallback(() => {
        return debounce((commentId: number) => {
            if (likedComments[commentId]) return;

            likeForm.post(route('comments.like', { comment: commentId }), {
                preserveScroll: true,
                onSuccess: () => {
                    if (flash?.status === 'error') {
                        return;
                    }
                    setLikedComments((prev) => ({
                        ...prev,
                        [commentId]: true,
                    }));
                    setDislikedComments((prev) => {
                        const newDislikes = { ...prev };
                        delete newDislikes[commentId];
                        return newDislikes;
                    });
                },
            });
        }, 1000);
    }, [likeForm, likedComments, flash]);

    const handleDislike = useCallback(() => {
        return debounce((commentId: number) => {
            if (dislikedComments[commentId]) return;

            dislikeForm.post(
                route('comments.dislike', { comment: commentId }),
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        if (flash?.status === 'error') {
                            return;
                        }
                        setDislikedComments((prev) => ({
                            ...prev,
                            [commentId]: true,
                        }));
                        setLikedComments((prev) => {
                            const newLikes = { ...prev };
                            delete newLikes[commentId];
                            return newLikes;
                        });
                    },
                },
            );
        }, 1000);
    }, [dislikeForm, dislikedComments, flash]);

    useEffect(() => {
        const likeFn = handleLike();
        const dislikeFn = handleDislike();
        return () => {
            likeFn.cancel();
            dislikeFn.cancel();
        };
    }, [handleLike, handleDislike]);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="rounded-full bg-purple-500 p-2.5">
                    <MessageCircleIcon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Comments
                </h3>
            </div>

            <AnimatePresence>
                {flash.message && (
                    <NotificationMessage
                        status={flash.status || 'success'}
                        message={flash.message}
                    />
                )}
            </AnimatePresence>

            {auth.user ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Textarea
                            value={createForm.data.content}
                            onChange={(e) =>
                                createForm.setData('content', e.target.value)
                            }
                            placeholder="Share your thoughts..."
                            className={clsx(
                                'w-full rounded-xl border-0 bg-white/80 px-4 py-3 text-gray-900 shadow-lg ring-1 ring-inset backdrop-blur-xl placeholder:text-gray-400 focus:ring-2 dark:bg-gray-800/80 dark:text-white dark:placeholder:text-gray-500',
                                {
                                    'ring-red-500/20 focus:ring-red-500 dark:ring-red-500/20':
                                        createForm.errors.content,
                                    'ring-purple-500/20 focus:ring-purple-500 dark:ring-purple-500/20':
                                        !createForm.errors.content,
                                },
                            )}
                            rows={3}
                            disabled={createForm.processing}
                            required
                        />
                        {createForm.errors.content && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-2 text-sm text-red-600 dark:text-red-400"
                            >
                                {createForm.errors.content}
                            </motion.p>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={
                                createForm.processing ||
                                !createForm.data.content
                            }
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            <SendIcon className="h-4 w-4" />
                            {createForm.processing
                                ? 'Posting...'
                                : 'Post Comment'}
                        </motion.button>
                    </div>
                </form>
            ) : (
                <div className="rounded-xl bg-purple-500/10 p-4 text-sm text-purple-600 dark:text-purple-400">
                    Please sign in to leave a comment.
                </div>
            )}

            <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {comments.map((comment) => (
                    <motion.div
                        key={comment.id}
                        variants={commentVariants}
                        className="overflow-hidden rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-xl transition-all dark:bg-gray-800/80"
                    >
                        <div className="flex items-start gap-3">
                            <img
                                src={comment.user.profile_photo}
                                alt={comment.user.name}
                                className="h-10 w-10 rounded-full object-cover ring-2 ring-purple-500/20"
                            />
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {comment.user.name}
                                        </span>
                                        <span className="ml-2 text-xs text-gray-500">
                                            {new Date(
                                                comment.created_at,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() =>
                                                handleLike()(comment.id)
                                            }
                                            disabled={likeForm.processing}
                                            className="group flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-gray-600 shadow-sm backdrop-blur-xl transition-colors hover:text-red-500 dark:bg-gray-900/50 dark:text-gray-400 dark:hover:text-red-400"
                                        >
                                            <HeartIcon className="h-4 w-4" />
                                            <span className="text-sm">
                                                {comment.likes}
                                            </span>
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() =>
                                                handleDislike()(comment.id)
                                            }
                                            disabled={dislikeForm.processing}
                                            className="group flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-gray-600 shadow-sm backdrop-blur-xl transition-colors hover:text-gray-900 dark:bg-gray-900/50 dark:text-gray-400 dark:hover:text-gray-300"
                                        >
                                            <ThumbsDownIcon className="h-4 w-4" />
                                            <span className="text-sm">
                                                {comment.dislikes}
                                            </span>
                                        </motion.button>
                                        {auth.user &&
                                            comment.user.id ===
                                                auth.user.id && (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() =>
                                                        handleDelete(comment.id)
                                                    }
                                                    disabled={
                                                        deleteForm.processing &&
                                                        deletingId ===
                                                            comment.id
                                                    }
                                                    className="rounded-full bg-white/80 p-2 text-gray-400 shadow-sm backdrop-blur-xl transition-colors hover:text-red-500 dark:bg-gray-900/50 dark:hover:text-red-400"
                                                >
                                                    <Trash2Icon className="h-4 w-4" />
                                                </motion.button>
                                            )}
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
