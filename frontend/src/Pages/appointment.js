
function Appointment() {
    return (
      <div className="appointment-page bg-[#EFF6FF]">
        <section className="appointment-form-section pt-14 pb-12">
          <div className="custom-container">
            <div className="main-container flex justify-between max-w-6xl mx-auto gap-8">
              {/* Left side text*/}
              <div className="left-container w-[40%] flex flex-col justify-between rounded-lg shadow-lg border bg-white px-10 py-12">
                <div className="top">
                  <h1 className="text-[#1E40AF]">Book an Appointment!</h1>
                  <p className="mt-6">
                    We have the best specialists in your region. Quality,
                    guarantee and professionalism are our slogan!
                  </p>
                </div>
                <div className="bottom">
                  <p className="mb-4">
                    Give us a few details below and our team will be in touch.
                  </p>
                  <p>
                    Need further details? Shoot us an email at
                    hello@gmail.com
                  </p>
                </div>
              </div>
              {/* Form*/}
              <div className="form w-[60%] rounded-lg shadow-lg border bg-white px-10 py-12">
                <form>
                  <div className="name">
                    <label className="block text-sm font-medium mb-4">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="rounded-lg w-full border border-[#a3a3a3] mb-8"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="email">
                    <label className="block text-sm font-medium mb-4">
                      Email
                    </label>
                    <input
                      type="email"
                      className="rounded-lg w-full border border-[#a3a3a3] mb-8"
                      placeholder="Email"
                    />
                  </div>
                  <div className="date">
                    <label className="block text-sm font-medium mb-4">
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      className="rounded-lg w-full border border-[#a3a3a3] mb-8"
                    />
                  </div>
                  <div className="time">
                    <label className="block text-sm font-medium mb-4">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      className="rounded-lg w-full border border-[#a3a3a3] mb-8"
                    />
                  </div>
                  <div className="message">
                    <label className="block text-sm font-medium mb-4">
                      Your Message
                    </label>
                    <textarea
                      placeholder="Please, descibe your problem"
                      className="rounded-lg w-full border border-[#a3a3a3] h-[140px] mb-10"
                    ></textarea>
                  </div>
                  <div className="button">
                    <button type="submit" className="common-button rounded-xl">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}

export default Appointment;
