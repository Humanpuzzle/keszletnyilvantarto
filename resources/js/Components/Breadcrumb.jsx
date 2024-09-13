
import NavLink from '@/Components/NavLink';

export default function Breadcrumb({ children }) {
    return (
        <div className='mx-auto w-full md:pt-2'>
            <ol className='dark:text-gray-400 items-center gap-1.5 break-words text-sm sm:gap-2.5 mb-2 flex w-full flex-nowrap text-neutral-500'>
                <li className='inline-flex items-center gap-1.5'>
                    <NavLink href="/">Home</NavLink>
                </li>
                <li className='inline-flex items-center gap-1.5 [&>svg]:size-3.5'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="text-neutral-500"><path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd"></path></svg></li>
                <li className='inline-flex items-center gap-1.5'>{ children }</li>
            </ol>
        </div>
    );
}