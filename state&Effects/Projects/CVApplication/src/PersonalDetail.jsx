import { useState } from "react"



function PersonalDetail() {
    const [person, setPerson] = useState({
        name: "John Doe",
        age: 18,
        email: "johndoe@gmail.com",
        phone: "9966102388",
        address: "London, UK"
    });

    // Individual state variables for each field
    const [name, setName] = useState(person.name);
    const [age, setAge] = useState(person.age);
    const [email, setEmail] = useState(person.email);
    const [phone, setPhone] = useState(person.phone);
    const [address, setAddress] = useState(person.address);

    // Optionally, sync person state when any input changes
    // But for now, just keep separate states for each field

    return (
        <div>
            <h2>Personal Details</h2>

            <h3>Full Name</h3>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />

            <h3>Age</h3>
            <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
            />

            <h3>Email</h3>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />

            <h3>Phone</h3>
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
            />

            <h3>Address</h3>
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
            />
        </div>
    );
}


export default PersonalDetail