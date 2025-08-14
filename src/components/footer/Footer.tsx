import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogo as LinkedinLogoIcon } from '@phosphor-icons/react';
function Footer() {

    const data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-nav-footer text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-bold'>
                            RH GENERATION - Grupo 04 | Copyright: {data}
                        </p>
                    <p className='text-lg'>Acesse nossas redes sociais</p>
                    <div className='flex gap-2'>
                <a href="https://www.linkedin.com/school/generationbrasil/" target="_blank" rel="noopener noreferrer">
                 <LinkedinLogoIcon size={48} weight='bold' />
                </a>
                <a href="https://github.com/Grupo-4-Turma-Javascript-07" target="_blank" rel="noopener noreferrer">
                 <GithubLogoIcon size={48} weight='bold' />
                </a>
                <a href="https://www.instagram.com/generationbrasil/" target="_blank" rel="noopener noreferrer">
                 <InstagramLogoIcon size={48} weight='bold' />
                </a>    
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer