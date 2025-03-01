import React from "react";
import { assets } from "../../assets/assets";

const AddDoctor = () => {
  return (
    <form>
      <p>Add Doctor</p>

      <div>
        <div>
          <label htmlFor="docimage">
            <img src={assets.upload_area} alt="uploeadarea" />
          </label>
          <input type="file" id="docimage" hidden />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>
        <div>
          <div>
            <div>
              <p>Your Name</p>
              <input type="text" placeholder="John Doe" required />
            </div>
            <div>
              <p>Doctor Email</p>
              <input type="email" placeholder="johndoe@example.com" required />
            </div>
            <div>
              <p>Doctor Password</p>
              <input type="passwors" placeholder="password" required />
            </div>
            <div>
              <p>Experiance</p>
              <select name="" id="">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div>
              <p>Doctor Fee</p>
              <input type="text" placeholder="5000" required />
            </div>
          </div>
          <div>
            <div>
              <p>Speciality</p>
              <select name="" id="">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div>
              <p>Education</p>
              <input type="text" placeholder="Education" required />
            </div>
            <div>
              <p>Address</p>
              <input type="text" placeholder="address 1" required />
              <input type="text" placeholder="address 2" required />
            </div>
          </div>
        </div>
        <div>
          <p>About Doctor</p>
          <textarea rows={5} placeholder="Write ablout Doctor" required />
        </div>
        <button>Add Doctor</button>
      </div>
    </form>
  );
};

export default AddDoctor;
