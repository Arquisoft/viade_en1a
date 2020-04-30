import React from "react";
import {Uploader} from "@inrupt/solid-react-components";
import {Trans, useTranslation} from "react-i18next";
import {
    WelcomeWrapper,
    WelcomeCard,
    WelcomeLogo,
    WelcomeProfile,
    WelcomeDetail,
    WelcomeName,
    ImageWrapper
} from "./welcome.style";
import {ImageProfile} from "@components";
import {errorToaster} from "@utils";
import {Button} from "react-bootstrap";
import {Modal} from "react-bootstrap";

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */

function MyVerticallyCenteredModal(props) {
    const {t} = props;
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t("welcome.notice")}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{t("welcome.covidtitle")}</h4>
                <p>
                    {t("welcome.covidbody")}
                </p>
                <p>
                    <ul>
                    <li><a href={"https://www.who.int/emergencies/diseases/novel-coronavirus-2019/events-as-they-happen"} >Rolling updates on coronavirus disease</a></li>
                    <li><a href={"https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"} >Coronavirus disease (COVID-19) advice for the public</a></li>
                    </ul>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>{t("welcome.close")}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export const WelcomePageContent = (props) => {
    const {webId, image, updatePhoto, name} = props;
    const {t} = useTranslation();
    const limit = 2100000;

    const [modalShow, setModalShow] = React.useState(false);

    React.useEffect(() => {    // Actualiza el título del documento usando la API del navegador
        setModalShow(true);
    }, []);

    return (
        <WelcomeWrapper data-testid="welcome-wrapper">
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                t = {t}
            />
            <WelcomeCard className="card">
                <WelcomeLogo data-testid="welcome-logo">
                    <img src="img/my_logo.jpg" alt="Inrupt"/>
                </WelcomeLogo>
                <WelcomeProfile data-testid="welcome-profile">
                    <h3>
                        {t("welcome.welcome")}, <WelcomeName>{name}</WelcomeName>
                    </h3>
                    <ImageWrapper>
                        <Uploader
                            {...{
                                fileBase: webId && webId.split("/card")[0],
                                limitFiles: 1,
                                limitSize: limit,
                                accept: "jpg,jpeg,png",
                                errorsText: {
                                    sizeLimit: t("welcome.errors.sizeLimit", {
                                        limit: `${limit / 1000000}Mbs`
                                    }),
                                    unsupported: t("welcome.errors.unsupported"),
                                    maximumFiles: t("welcome.errors.maximumFiles")
                                },
                                onError: (error) => {
                                    if (error && error.statusText) {
                                        errorToaster(error.statusText, t("welcome.errorTitle"));
                                    }
                                },
                                onComplete: (uploadedFiles) => {
                                    updatePhoto(
                                        uploadedFiles[uploadedFiles.length - 1].uri,
                                        t("welcome.uploadSuccess"),
                                        t("welcome.successTitle")
                                    );
                                },
                                render: (props) => (
                                    <ImageProfile
                                        {...{
                                            ...props,
                                            webId,
                                            photo: image,
                                            text: t("welcome.upload"),
                                            uploadingText: t("welcome.uploadingText")
                                        }}
                                    />
                                )
                            }}
                        />
                    </ImageWrapper>
                </WelcomeProfile>
            </WelcomeCard>
            <WelcomeCard className="card">
                <WelcomeDetail data-testid="welcome-detail">
                    <h3>{t("welcome.contactUsTitle")}</h3>
                    <Trans i18nKey="welcome.contactUsText">
                        <p>
                            This application was created by the EN14 team for Uniovi's Software Architecture subject in
                            collaboration with Inrupt.
                        </p>
                    </Trans>
                </WelcomeDetail>
            </WelcomeCard>
        </WelcomeWrapper>
    );
};
