import { FC } from 'react';

import { Separator } from '@/components/ui/separator';

interface FormTitleProps {
    title: string;
}

const PostTitle: FC<FormTitleProps> = ({ title }) => {
    return (
        <div className="flex flex-col space-y-2">
            <p className="text-md font-semibold">{title}</p>
            <Separator />
        </div>
    );
};

export default PostTitle;
