import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setName(JSON.parse(storedUser).name);
      setPhoneNumber(JSON.parse(storedUser).phoneNumber);
    }
  }, []);

  const handleSave = () => {
    const updatedUser = { ...user, name, phoneNumber };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    router.push('/dashboard');
  };

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Phone Number</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Profile;
