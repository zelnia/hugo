import {ss} from './style.js';
import React, { useEffect } from 'react';
import { Button, Paragraph,Portal, Dialog,IconButton} from 'react-native-paper';


function CosafaInterno() {
    return(
        <>
            <Paragraph style={ss.giustificato}>Hugò è un app di servizi: Hugò può essere il tuo personal shopper.</Paragraph>
            <Paragraph style={ss.giustificato}>Può ritirare acquistare e consegnare qualsiasi cosa (Farmaci, spesa, pasticcini, etc.).</Paragraph>
            <Paragraph style={ss.giustificato}>Può comprare anche una pizza e consegnartela a domicilio.</Paragraph>
            <Paragraph style={ss.giustificato}>Può accompagnarti dove tu vorrai (in città) e se devi spostarti fuori città Hugò è anche un servizio taxi con conducente (NCC, attivo solo in alcune città).</Paragraph>
            {/* <Paragraph style={ss.giustificato}>Inserisci nelle note dove vuoi andare, numero di passeggeri, data e ora di partenza. Cliccka l'ora in cui vuoi essere chiamato, ti richiameremo per un preventivo immediato. </Paragraph> */}
        </>
    );
}

function Cosafa({visibilita}) {
    // const [visible, setVisible] = React.useState(visibilita);
    const [togglevisibilita, settogglevisibilita] = React.useState(visibilita);
    // useEffect(() => {
    //     setVisible(visibilita);
    // }, [visibilita]);
    useEffect(() => {
        togglevisibilita?settogglevisibilita(false):settogglevisibilita(true);
    }, [visibilita]);
    // const hideDialog = () => setVisible(false);
    const ssettogglevisibilita = () => {
        togglevisibilita?settogglevisibilita(false):settogglevisibilita(true);
    };

    return(
        <Portal>
            <Dialog visible={togglevisibilita} onDismiss={ssettogglevisibilita}>
            {/* <Dialog visible={visible} onDismiss={hideDialog}> */}
            <Dialog.Title>Cosa fa Hugò?</Dialog.Title>
            <Dialog.Content>
                <Paragraph style={ss.giustificato}>Hugò è il tuo personal shopper può ritirare acquistare e consegnare qualsiasi cosa (Farmaci, spesa, pasticcini, etc.).</Paragraph>
                <Paragraph style={ss.giustificato}>Può accompagnarti dove tu vorrai (in città) e se devi spostarti fuori città Hugò è anche un servizio taxi con conducente (NCC, attivo solo in alcune città).</Paragraph>
                {/* <Paragraph style={ss.giustificato}>Inserisci nelle note dove vuoi andare, numero di passeggeri, data e ora di partenza. Cliccka l'ora in cui vuoi essere chiamato, ti richiameremo per un preventivo immediato. </Paragraph> */}
                <Button style={[ss.w100, ss.mt15]} mode="contained" onPress={ssettogglevisibilita}>OK</Button>
            </Dialog.Content>
            </Dialog>
        </Portal>
    );
}

function InfoDialog({visibilita,ptestoinfo}) {
    const [togglevisibilita, settogglevisibilita] = React.useState(visibilita);
    const [testoinfo, settestoinfo] = React.useState(testoinfo);

    useEffect(() => {
        togglevisibilita?settogglevisibilita(false):settogglevisibilita(true);
    }, [visibilita]);

    // useEffect(() => {
    //     setdialogovisible(false);
    // }, [dialogovisible]);

    useEffect(() => {
        settestoinfo(ptestoinfo);
    }, [ptestoinfo]);

    // const hideDialog = () => setdialogovisible(false);
    const ssettogglevisibilita = () => {
        togglevisibilita?settogglevisibilita(false):settogglevisibilita(true);
    };

    return(
        <Portal>
            <Dialog visible={togglevisibilita} onDismiss={ssettogglevisibilita}>
            <Dialog.Title>Cosa fa Hugò?</Dialog.Title>
            <Dialog.Content>
                <Paragraph style={ss.giustificato}>{testoinfo}</Paragraph>
                <Button style={[ss.w100, ss.mt15]} mode="contained" onPress={ssettogglevisibilita}>OK</Button>
            </Dialog.Content>
            </Dialog>
        </Portal>
    );
}

const Info2 = ({tinfo,stili}) => {
    const [visible, setVisible] = React.useState(true);
    const [itinfo, settinfo] = React.useState(tinfo);

    const ssettogglevisibilita = () => {
        visible?setVisible(false):setVisible(true);
    };

    useEffect(() => {
        settinfo(tinfo);
    }, [tinfo]);

    return (
        <>
            <IconButton
                icon="information"
                color='#00a1ae'
                size={20}
                style={stili}
                onPress={async () => {
                    settinfo(itinfo);
                    ssettogglevisibilita();
                }}
            />
            <InfoDialog visibilita={visible} ptestoinfo={itinfo} />
        </>
    )
  }

export {CosafaInterno}
// export {Cosafa,Info2}