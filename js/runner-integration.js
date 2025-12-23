// js/runner-integration.js
import { db, collection, query, where, onSnapshot, updateDoc, doc, orderBy } from '../firebase-config.js';

// TODO: In production, fetch this from the logged-in user's profile
const RUNNER_CITY = "Cebu"; 
const taskContainer = document.getElementById('task-container');

const q = query(
    collection(db, "bookings"), 
    where("city", "==", RUNNER_CITY),
    where("status", "in", ["pending", "assigned"]),
    orderBy("date")
);

onSnapshot(q, (snapshot) => {
    taskContainer.innerHTML = "";
    if (snapshot.empty) {
        taskContainer.innerHTML = "<p class='text-center text-gray-500'>No upcoming tasks.</p>";
        return;
    }

    snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const el = document.createElement('div');
        el.className = "bg-white p-4 mb-3 rounded shadow border-l-4 border-blue-500";
        el.innerHTML = `
            <div class="flex justify-between">
                <div>
                    <h3 class="font-bold">${data.unit}</h3>
                    <p class="text-sm text-gray-600">${data.prospectName}</p>
                </div>
                <div class="text-right">
                    <p class="font-bold text-blue-600">${data.time}</p>
                    <p class="text-xs">${data.date}</p>
                </div>
            </div>
            ${data.status === 'pending' ? 
                `<button onclick="window.acceptBooking('${docSnap.id}')" class="w-full mt-2 bg-green-500 text-white py-1 rounded">Accept Task</button>` : 
                `<div class="mt-2 text-center text-xs text-green-600 font-bold uppercase border border-green-600 rounded">Accepted</div>`
            }
        `;
        taskContainer.appendChild(el);
    });
});

window.acceptBooking = async (id) => {
    await updateDoc(doc(db, "bookings", id), { status: 'assigned' });
};
