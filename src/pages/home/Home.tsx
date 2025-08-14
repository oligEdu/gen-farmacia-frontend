
function Home() {
    return (
        <>
            <div id='home' className=" min-h-screen bg-background flex justify-center scroll-mt-20">
                <div className='container grid grid-cols-2 text-black'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4 px-9 ">
                        <h2 className='text-4xl font-bold text-black'>
                            RH Generation
                        </h2>
                        <p className='text-lg'>
                            Gerencie sua equipe com mais eficiência, organização e praticidade.
                            Aqui você encontra tudo o que precisa para administrar dados de colaboradores, acompanhar desempenho, controlar benefícios e muito mais, tudo em um só lugar.
                        </p>
                    </div>

                    <div className="flex justify-center ">
{/*                         <img
                            src={RH}
                            alt="Imagem Página Home"
                            className='w-3/3'
                        /> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home