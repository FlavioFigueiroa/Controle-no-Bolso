import React, { useState } from "react";
import styles from './Infos.module.css'

function Infos(){
    const [videoSelecionado, setVideoSelecionado] = useState(null);

    const videos = [
        {
            id: 1,
            titulo: "QUAL A DIFERENÇA ENTRE CDI E CDB?",
            descricao: "Vou te explicar o que significa quando está escrito Rendendo 100% do CDI naquele dinheiro que você tem guardado.",
            url: "https://www.youtube.com/embed/qH4-WvDiZbs?si=H7pdy1Aid-H9pE1I",
        },
        {
            id: 2,
            titulo: "5 passos rápidos para montar sua RESERVA DE EMERGÊNCIA",
            descricao: "Dicas práticas para economizar no dia a dia.",
            url: "https://www.youtube.com/embed/egtTW_zvqJM?si=dlt1jZIMYi32szb4",
        },
        {
            id: 3,
            titulo: "Tesouro Direto para iniciantes",
            descricao: "Uma introdução ao mundo dos investimentos.",
            url: "https://www.youtube.com/embed/y2sBkIX72-g?si=1bBg9lvrMvmx_EeU",
        },
        {
            id: 4,
            titulo: "Como Sair das Dívidas",
            descricao: "Estratégias para organizar suas finanças e eliminar dívidas.",
            url: "https://www.youtube.com/embed/CX_DQKthhig?si=6IuhFqnpAhHkPxLx",
        },
    ];

    return (
        <div className={styles.educacao_financeira}>
            <h1>Educação Financeira</h1>
            <p>Explore vídeos educativos para melhorar sua relação com dinheiro.</p>

            <div className={styles.conteudo}>
                {/* Lista de vídeos na coluna esquerda */}
                <div className={styles.lista_videos}>
                    {videos.map((video) => (
                        <div key={video.id} className={styles.card_video} onClick={() => setVideoSelecionado(video)}>
                            <h3>{video.titulo}</h3>
                            <p>{video.descricao}</p>
                        </div>
                    ))}
                </div>

                {/* Player do Vídeo Selecionado na coluna direita */}
                <div className={styles.player_video}>
                    {videoSelecionado ? (
                        <>
                            <h2>{videoSelecionado.titulo}</h2>
                            <iframe
                                width="100%"
                                height="315"
                                src={videoSelecionado.url}
                                title={videoSelecionado.titulo}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </>
                    ) : (
                        <p>Selecione um vídeo na lista para assistir.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Infos