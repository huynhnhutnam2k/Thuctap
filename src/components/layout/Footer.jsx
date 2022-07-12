function Footer() {
  return (
    <footer className="footer">
      <div className="logo">
        <img
          src=" https://cdn.glitch.global/7b4743d8-a7e2-4d18-a87b-a1248d42b7cc/logo-dai-hoc-y-duoc-can-tho-removebg.png?v=1653157725576"
          alt="logo"
        />
      </div>
      <div className="infof">
        <p className="school">
          Trường Đại học Y Dược Cần Thơ (Can Tho University of Medicine and
          Pharmacy)
        </p>
        <p>
          Số 179, đường Nguyễn Văn Cừ, P. An Khánh, Q. Ninh Kiều, TP. Cần Thơ.
          <br />
          Điện thoại: (84-0292) 3 739 730 (Phòng Hành chánh tổng hợp).
          <br />
          Fax: (84-0292) 3 740221 ;<br></br>Email: ctump@ctump.edu.vn
          <br />
          <a href="https://www.youtube.com/truongdaihocyduocct">
            <i className="fa fa-youtube-play"></i> Trang Youtube,{" "}
          </a>
          <a href="https://www.facebook.com/dhydct.ctump.edu.vn">
            <i className="fa fa-facebook-official"></i> Trang Fanpage
          </a>
        </p>
      </div>
      <div className="map">
        {/* <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d927.0732924780157!2d105.75432669826547!3d10.033381018734902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0886a7cfe14df%3A0x34602e2fdca1972d!2zxJDhuqFpIEjhu41jIFkgRMaw4bujYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1653290890034!5m2!1svi!2s"
      width="300vw" height="170vw" title="map" allowFullScreen="" loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"></iframe> */}
      </div>

      <div title="Về đầu trang" id="top-up">
        <div className="div-up">
          <i className="fa fa-angle-up"></i>
        </div>
      </div>
      <div className="copy">
        <p>Bản quyền thuộc về: &copy; Trường đại học Y dược Cần Thơ </p>
      </div>
    </footer>
  );
}

export default Footer;
