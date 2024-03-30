import React from 'react';

const AppFooter = () => {
  return (
    <footer className="bg-dark text-light">
      <div className="container p-4">
        <section className="d-flex justify-content-center justify-content-lg-between border-bottom pb-4 mb-4">
          <div className="me-5 d-none d-lg-block">
            <span className="fs-5">Follow us on social media:</span>
          </div>

          <div>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="row mt-5">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Company</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero eu ultricies vehicula.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Shop</h6>
              <p>
                <a href="#" className="text-reset">Men's Wear</a>
              </p>
              <p>
                <a href="#" className="text-reset">Women's Wear</a>
              </p>
              <p>
                <a href="#" className="text-reset">Shoes</a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Customer Service</h6>
              <p>
                <a href="#" className="text-reset">Contact Us</a>
              </p>
              <p>
                <a href="#" className="text-reset">Shipping Information</a>
              </p>
              <p>
                <a href="#" className="text-reset">Returns & Exchanges</a>
              </p>
              <p>
                <a href="#" className="text-reset">FAQ</a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-2"></i>
                1234 Main St, City, Country
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                info@example.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> +123 456 789
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="text-center p-4 bg-secondary">
        © {new Date().getFullYear()} Vshop. All rights reserved.
      Desgined by Hapsha
      </div>
    </footer>
  );
}

export default AppFooter;
