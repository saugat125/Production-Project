import Navbar from '../Components/Navbar';
import ProfieSidebar from '../Components/ProfileSidebar';

function MedicalHistory(){
    return (
      <div>
        <div className="nav">
          <Navbar />
        </div>

        <div className="medical-history-page py-10 my-6 bg-[linear-gradient(to_bottom,#EFF6FF,#FFFFFF)]">
          <div className="medical-history">
            <div className="custom-container">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <ProfieSidebar />

                {/* Medical History */}
                <div className="medical flex-1 bg-[#f6f6f6] rounded-3xl p-8 shadow-custom border h-[500px]">
                <div className="title">
                    <h4 className="text-3xl mb-4">Medical History</h4>
                    <p>
                    Record of the previously predicted diseases along with
                    additional information
                    </p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default MedicalHistory;