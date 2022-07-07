import { Row, Col, Typography } from 'antd';
import './contact.css';

const { Title, Text } = Typography;
const Contact = () => {
    return (
        <div className="contact_page">
            <section className="info_contact">
                <Title>Thông tin liên hệ</Title>
                <Text>
                    <i className="fas fa-map-marked-alt"></i> 475A Điện Biên Phủ, Quận Bình Thạnh,
                    TP.HCM
                </Text>
                <br />
                <Text>
                    <i className="fas fa-phone"></i> 0847 630 640
                </Text>
                <br />
                <Text>
                    <i className="fas fa-envelope"></i> me@devtry.net
                </Text>
            </section>
            <section className="map_and_contact">
                <Row>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="mapouter">
                            <div className="gmap_canvas">
                                <iframe
                                    title="google-map"
                                    className="gmap_iframe"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight="0"
                                    marginWidth="0"
                                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=hutech&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                                ></iframe>
                                <a href="https://www.kokagames.com/fnf-friday-night-funkin-mods/">
                                    FNF
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="contact_form" style={{ zIndex: 2 }}>
                            <div className="contact__container">
                                <h4 className="contact__header">Liên hệ với chúng tôi</h4>
                                <form
                                    action="mailto:chimcudammua@gmail.com"
                                    className="contact__form"
                                    encType="multipart/form-data"
                                >
                                    <input
                                        type="text"
                                        className="contact__input contact__input1  "
                                        placeholder="Name"
                                        name="name"
                                    ></input>
                                    <input
                                        type="text"
                                        className="contact__input contact__input1"
                                        placeholder="Email"
                                        name="email"
                                    ></input>
                                    <input
                                        type="text"
                                        className="contact__input"
                                        placeholder="Subject"
                                        name="subject"
                                    ></input>
                                    <textarea
                                        name="comment"
                                        className="contact__input"
                                        cols="5"
                                        rows="4"
                                        placeholder="Message"
                                    ></textarea>
                                    <button type="submit" className="btn contact__btn">
                                        Send Message...
                                    </button>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </div>
    );
};

export default Contact;
