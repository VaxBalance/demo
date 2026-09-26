/* =====================================================
   VAXBALANCE
   Vaccine Inventory and Patient Immunization Management
===================================================== */



/* =====================================================
   PATIENT RECORDS

   Patient registration is stored in localStorage.

   This means:
   Patient registers
        ↓
   Patient is added here
        ↓
   RHU can see the patient
===================================================== */

let patients =
    JSON.parse(
        localStorage.getItem(
            "vaxbalancePatients"
        )
    ) || [

        {
            id: "P001",

            name: "Juan Dela Cruz",

            age: 21,

            contact: "09123456789",

            username: "juan",

            password: "123"
        },


        {
            id: "P002",

            name: "Maria Santos",

            age: 19,

            contact: "09987654321",

            username: "maria",

            password: "123"
        },


        {
            id: "P003",

            name: "Pedro Reyes",

            age: 25,

            contact: "09112223344",

            username: "pedro",

            password: "123"
        }

    ];



/* =====================================================
   SAMPLE IMMUNIZATION RECORDS
===================================================== */

let immunizationRecords = [

    {
        vaccine: "BCG",

        dose: "Dose 1",

        date: "2026-01-15",

        status: "Completed"
    },


    {
        vaccine: "Hepatitis B",

        dose: "Dose 1",

        date: "2026-01-15",

        status: "Completed"
    },


    {
        vaccine: "MMR",

        dose: "Dose 1",

        date: "2026-03-10",

        status: "Completed"
    }

];



/* =====================================================
   VACCINATION SCHEDULE
===================================================== */

let vaccinationSchedule = [

    {
        vaccine: "Hepatitis B",

        dose: "Dose 2",

        date: "2026-10-15",

        status: "Upcoming"
    },


    {
        vaccine: "MMR",

        dose: "Dose 2",

        date: "2026-11-10",

        status: "Upcoming"
    }

];



/* =====================================================
   PATIENT APPOINTMENTS
===================================================== */

let appointments = [

    {
        date: "2026-10-15",

        time: "09:00",

        purpose: "Hepatitis B Dose 2",

        status: "Scheduled"
    }

];



/* =====================================================
   RHU INVENTORY
===================================================== */

let inventory = [

    {
        vaccine: "BCG",

        batch: "BCG-001",

        quantity: 8,

        expiration: "2027-01-15"
    },


    {
        vaccine: "Hepatitis B",

        batch: "HEPB-002",

        quantity: 25,

        expiration: "2027-04-20"
    },


    {
        vaccine: "MMR",

        batch: "MMR-003",

        quantity: 4,

        expiration: "2026-11-15"
    },


    {
        vaccine: "Polio",

        batch: "POL-004",

        quantity: 2,

        expiration: "2026-10-05"
    }

];



/* =====================================================
   RHU APPOINTMENTS
===================================================== */

let rhuAppointments = [

    {
        patient: "Juan Dela Cruz",

        date: "2026-10-15",

        time: "09:00",

        purpose: "Hepatitis B Dose 2",

        status: "Scheduled"
    },


    {
        patient: "Maria Santos",

        date: "2026-10-20",

        time: "10:00",

        purpose: "MMR Dose 2",

        status: "Scheduled"
    }

];



/* =====================================================
   LOGIN
===================================================== */

function login() {

    const username =
        document
            .getElementById("username")
            .value
            .trim();


    const password =
        document
            .getElementById("password")
            .value;


    if (
        username === "" ||
        password === ""
    ) {

        alert(
            "Please enter username and password."
        );

        return;
    }



    /* =================================================
       RHU LOGIN

       Demo RHU account:

       Username: rhu
       Password: 123
    ================================================== */

    if (
        username === "rhu" &&
        password === "123"
    ) {

        document
            .getElementById("loginPage")
            .classList
            .add("hidden");


        document
            .getElementById("appPage")
            .classList
            .remove("hidden");


        document
            .getElementById("patientMenu")
            .classList
            .add("hidden");


        document
            .getElementById("rhuMenu")
            .classList
            .remove("hidden");


        document
            .getElementById("userRoleText")
            .textContent =
            "RHU Personnel";


        showPage(
            "rhuDashboard"
        );


        updateAll();


        return;
    }



    /* =================================================
       PATIENT LOGIN
    ================================================== */

    const patient =
        patients.find(
            function(patient) {

                return (

                    patient.username ===
                    username

                    &&

                    patient.password ===
                    password

                );

            }
        );



    if (!patient) {

        alert(
            "Invalid username or password."
        );

        return;
    }



    /* Save currently logged-in patient */

    localStorage.setItem(

        "vaxbalanceCurrentPatient",

        JSON.stringify(patient)

    );



    document
        .getElementById("loginPage")
        .classList
        .add("hidden");


    document
        .getElementById("appPage")
        .classList
        .remove("hidden");


    document
        .getElementById("patientMenu")
        .classList
        .remove("hidden");


    document
        .getElementById("rhuMenu")
        .classList
        .add("hidden");


    document
        .getElementById("userRoleText")
        .textContent =
        "Patient - " +
        patient.name;


    showPage(
        "patientDashboard"
    );


    updateAll();

}



/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    document
        .getElementById("appPage")
        .classList
        .add("hidden");


    document
        .getElementById("loginPage")
        .classList
        .remove("hidden");


    document
        .getElementById("username")
        .value = "";


    document
        .getElementById("password")
        .value = "";

}



/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageId) {

    const pages =
        document.querySelectorAll(
            ".page"
        );


    pages.forEach(
        function(page) {

            page.classList
                .add("hidden");

        }
    );


    const selectedPage =
        document.getElementById(
            pageId
        );


    if (selectedPage) {

        selectedPage.classList
            .remove("hidden");

    }


    updateAll();

}



/* =====================================================
   IMMUNIZATION RECORDS
===================================================== */

function renderImmunizationRecords() {

    const table =
        document.getElementById(
            "immunizationTable"
        );


    table.innerHTML = "";


    immunizationRecords.forEach(

        function(record) {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${record.vaccine}
                </td>

                <td>
                    ${record.dose}
                </td>

                <td>
                    ${record.date}
                </td>

                <td>
                    ${record.status}
                </td>

            `;


            table.appendChild(row);

        }

    );

}



/* =====================================================
   VACCINATION SCHEDULE
===================================================== */

function renderSchedule() {

    const table =
        document.getElementById(
            "scheduleTable"
        );


    table.innerHTML = "";


    vaccinationSchedule.forEach(

        function(item) {

            const row =
                document.createElement(
                    "tr"
                );


            const today =
                new Date();


            const scheduleDate =
                new Date(
                    item.date
                );


            let status =
                item.status;


            if (
                scheduleDate <
                today
            ) {

                status =
                    "Overdue";

            }


            row.innerHTML = `

                <td>
                    ${item.vaccine}
                </td>

                <td>
                    ${item.dose}
                </td>

                <td>
                    ${item.date}
                </td>

                <td>
                    ${status}
                </td>

            `;


            table.appendChild(row);

        }

    );

}



/* =====================================================
   PATIENT APPOINTMENTS
===================================================== */

function renderAppointments() {

    const table =
        document.getElementById(
            "appointmentTable"
        );


    table.innerHTML = "";


    appointments.forEach(

        function(appointment) {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${appointment.date}
                </td>

                <td>
                    ${appointment.time}
                </td>

                <td>
                    ${appointment.purpose}
                </td>

                <td>
                    ${appointment.status}
                </td>

            `;


            table.appendChild(row);

        }

    );

}



/* =====================================================
   PATIENT DASHBOARD
===================================================== */

function updatePatientDashboard() {

    document.getElementById(
        "completedVaccineCount"
    ).textContent =
        immunizationRecords.length;


    document.getElementById(
        "patientAppointmentCount"
    ).textContent =
        appointments.length;



    let overdue = 0;


    vaccinationSchedule.forEach(

        function(item) {

            const today =
                new Date();


            const date =
                new Date(
                    item.date
                );


            if (
                date < today
            ) {

                overdue++;

            }

        }

    );


    document.getElementById(
        "overdueCount"
    ).textContent =
        overdue;



    if (
        vaccinationSchedule.length
        > 0
    ) {

        document.getElementById(
            "nextVaccination"
        ).textContent =

            vaccinationSchedule[0].vaccine
            + " - "
            + vaccinationSchedule[0].date;

    }


    renderPatientAlerts();

}



/* =====================================================
   PATIENT ALERTS
===================================================== */

function renderPatientAlerts() {

    const container =
        document.getElementById(
            "patientAlerts"
        );


    container.innerHTML = "";


    vaccinationSchedule.forEach(

        function(item) {

            const date =
                new Date(
                    item.date
                );


            const today =
                new Date();


            const alert =
                document.createElement(
                    "div"
                );


            if (
                date < today
            ) {

                alert.className =
                    "alert-item alert-danger";


                alert.textContent =

                    "OVERDUE: "
                    + item.vaccine
                    + " "
                    + item.dose;

            }

            else {

                alert.className =
                    "alert-item alert-warning";


                alert.textContent =

                    "Upcoming vaccination: "
                    + item.vaccine
                    + " on "
                    + item.date;

            }


            container.appendChild(
                alert
            );

        }

    );


    if (
        vaccinationSchedule.length
        === 0
    ) {

        container.innerHTML =

            '<div class="alert-item alert-normal">' +
            'No alerts.' +
            '</div>';

    }

}



/* =====================================================
   INVENTORY
===================================================== */

function renderInventory() {

    const table =
        document.getElementById(
            "inventoryTable"
        );


    table.innerHTML = "";


    inventory.forEach(

        function(item, index) {

            const row =
                document.createElement(
                    "tr"
                );


            const today =
                new Date();


            const expiration =
                new Date(
                    item.expiration
                );


            let status =
                "Normal";


            if (
                item.quantity <= 5
            ) {

                status =
                    "Low Stock";

            }


            if (
                expiration < today
            ) {

                status =
                    "Expired";

            }


            row.innerHTML = `

                <td>
                    ${item.vaccine}
                </td>

                <td>
                    ${item.batch}
                </td>

                <td>
                    ${item.quantity}
                </td>

                <td>
                    ${item.expiration}
                </td>

                <td>
                    ${status}
                </td>

                <td>

                    <button
                        onclick="deleteInventory(${index})"
                    >
                        Delete
                    </button>

                </td>

            `;


            table.appendChild(
                row
            );

        }

    );

}



/* =====================================================
   OPEN INVENTORY FORM
===================================================== */

function openInventoryForm() {

    document
        .getElementById(
            "inventoryModal"
        )
        .classList
        .remove("hidden");

}



/* =====================================================
   SAVE INVENTORY
===================================================== */

function saveInventory() {

    const vaccine =
        document
            .getElementById(
                "vaccineName"
            )
            .value
            .trim();


    const batch =
        document
            .getElementById(
                "batchNumber"
            )
            .value
            .trim();


    const quantity =
        Number(
            document
                .getElementById(
                    "vaccineQuantity"
                )
                .value
        );


    const expiration =
        document
            .getElementById(
                "expirationDate"
            )
            .value;


    if (

        vaccine === ""

        ||

        batch === ""

        ||

        quantity <= 0

        ||

        expiration === ""

    ) {

        alert(
            "Please complete all fields."
        );

        return;
    }


    inventory.push({

        vaccine:
            vaccine,

        batch:
            batch,

        quantity:
            quantity,

        expiration:
            expiration

    });


    closeModal(
        "inventoryModal"
    );


    document.getElementById(
        "vaccineName"
    ).value = "";


    document.getElementById(
        "batchNumber"
    ).value = "";


    document.getElementById(
        "vaccineQuantity"
    ).value = "";


    document.getElementById(
        "expirationDate"
    ).value = "";


    updateAll();

}



/* =====================================================
   DELETE INVENTORY
===================================================== */

function deleteInventory(index) {

    if (
        confirm(
            "Delete this inventory item?"
        )
    ) {

        inventory.splice(
            index,
            1
        );


        updateAll();

    }

}



/* =====================================================
   LOW STOCK
===================================================== */

function getLowStockItems() {

    return inventory.filter(

        function(item) {

            return (
                item.quantity <= 5
            );

        }

    );

}



/* =====================================================
   EXPIRING SOON
===================================================== */

function getExpiringItems() {

    const today =
        new Date();


    const thirtyDays =
        new Date();


    thirtyDays.setDate(

        today.getDate()
        + 30

    );


    return inventory.filter(

        function(item) {

            const expiration =
                new Date(
                    item.expiration
                );


            return (

                expiration >= today

                &&

                expiration <=
                thirtyDays

            );

        }

    );

}



/* =====================================================
   RHU DASHBOARD
===================================================== */

function updateRhuDashboard() {

    const totalStock =
        inventory.reduce(

            function(
                total,
                item
            ) {

                return (
                    total +
                    item.quantity
                );

            },

            0

        );


    const lowStock =
        getLowStockItems();


    const expiring =
        getExpiringItems();


    document.getElementById(
        "totalPatients"
    ).textContent =
        patients.length;


    document.getElementById(
        "totalStock"
    ).textContent =
        totalStock;


    document.getElementById(
        "lowStockCount"
    ).textContent =
        lowStock.length;


    document.getElementById(
        "expiringCount"
    ).textContent =
        expiring.length;


    renderRhuAlerts();

}



/* =====================================================
   RHU ALERTS
===================================================== */

function renderRhuAlerts() {

    const container =
        document.getElementById(
            "rhuAlerts"
        );


    container.innerHTML = "";


    const lowStock =
        getLowStockItems();


    const expiring =
        getExpiringItems();



    lowStock.forEach(

        function(item) {

            const alert =
                document.createElement(
                    "div"
                );


            alert.className =
                "alert-item alert-danger";


            alert.textContent =

                "LOW STOCK: "
                + item.vaccine
                + " has only "
                + item.quantity
                + " remaining.";


            container.appendChild(
                alert
            );

        }

    );



    expiring.forEach(

        function(item) {

            const alert =
                document.createElement(
                    "div"
                );


            alert.className =
                "alert-item alert-warning";


            alert.textContent =

                "EXPIRING SOON: "
                + item.vaccine
                + " expires on "
                + item.expiration;


            container.appendChild(
                alert
            );

        }

    );



    if (

        lowStock.length === 0

        &&

        expiring.length === 0

    ) {

        container.innerHTML =

            '<div class="alert-item alert-normal">' +
            'No inventory alerts.' +
            '</div>';

    }

}



/* =====================================================
   RHU PATIENT RECORDS
===================================================== */

function renderPatients() {

    const table =
        document.getElementById(
            "patientTable"
        );


    table.innerHTML = "";


    patients.forEach(

        function(
            patient,
            index
        ) {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${patient.id}
                </td>

                <td>
                    ${patient.name}
                </td>

                <td>
                    ${patient.age}
                </td>

                <td>
                    ${patient.contact}
                </td>

                <td>

                    <button
                        onclick="deletePatient(${index})"
                    >
                        Delete
                    </button>

                </td>

            `;


            table.appendChild(
                row
            );

        }

    );

}



/* =====================================================
   OPEN RHU PATIENT FORM
===================================================== */

function openPatientForm() {

    document
        .getElementById(
            "patientModal"
        )
        .classList
        .remove("hidden");

}



/* =====================================================
   RHU ADD PATIENT
===================================================== */

function savePatient() {

    const id =
        document
            .getElementById(
                "patientId"
            )
            .value
            .trim();


    const name =
        document
            .getElementById(
                "patientName"
            )
            .value
            .trim();


    const age =
        Number(
            document
                .getElementById(
                    "patientAge"
                )
                .value
        );


    const contact =
        document
            .getElementById(
                "patientContact"
            )
            .value
            .trim();



    if (

        id === ""

        ||

        name === ""

        ||

        age <= 0

        ||

        contact === ""

    ) {

        alert(
            "Please complete all fields."
        );

        return;
    }



    const existingPatient =
        patients.find(

            function(patient) {

                return (
                    patient.id === id
                );

            }

        );


    if (existingPatient) {

        alert(
            "Patient ID already exists."
        );

        return;
    }



    patients.push({

        id:
            id,

        name:
            name,

        age:
            age,

        contact:
            contact

    });



    localStorage.setItem(

        "vaxbalancePatients",

        JSON.stringify(
            patients
        )

    );



    closeModal(
        "patientModal"
    );



    document.getElementById(
        "patientId"
    ).value = "";


    document.getElementById(
        "patientName"
    ).value = "";


    document.getElementById(
        "patientAge"
    ).value = "";


    document.getElementById(
        "patientContact"
    ).value = "";



    updateAll();

}



/* =====================================================
   DELETE PATIENT
===================================================== */

function deletePatient(index) {

    if (
        confirm(
            "Delete this patient?"
        )
    ) {

        patients.splice(
            index,
            1
        );


        localStorage.setItem(

            "vaxbalancePatients",

            JSON.stringify(
                patients
            )

        );


        updateAll();

    }

}



/* =====================================================
   RHU APPOINTMENTS
===================================================== */

function renderRhuAppointments() {

    const table =
        document.getElementById(
            "rhuAppointmentTable"
        );


    table.innerHTML = "";


    rhuAppointments.forEach(

        function(
            item,
            index
        ) {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${item.patient}
                </td>

                <td>
                    ${item.date}
                </td>

                <td>
                    ${item.time}
                </td>

                <td>
                    ${item.purpose}
                </td>

                <td>
                    ${item.status}
                </td>

                <td>

                    <button
                        onclick="completeAppointment(${index})"
                    >
                        Complete
                    </button>

                </td>

            `;


            table.appendChild(
                row
            );

        }

    );

}



/* =====================================================
   COMPLETE APPOINTMENT
===================================================== */

function completeAppointment(index) {

    rhuAppointments[index].status =
        "Completed";


    updateAll();

}



/* =====================================================
   OPEN PATIENT APPOINTMENT FORM
===================================================== */

function openAppointmentForm() {

    document
        .getElementById(
            "appointmentModal"
        )
        .classList
        .remove("hidden");

}



/* =====================================================
   SAVE PATIENT APPOINTMENT
===================================================== */

function saveAppointment() {

    const date =
        document
            .getElementById(
                "appointmentDate"
            )
            .value;


    const time =
        document
            .getElementById(
                "appointmentTime"
            )
            .value;


    const purpose =
        document
            .getElementById(
                "appointmentPurpose"
            )
            .value
            .trim();



    if (

        date === ""

        ||

        time === ""

        ||

        purpose === ""

    ) {

        alert(
            "Please complete all fields."
        );

        return;
    }



    appointments.push({

        date:
            date,

        time:
            time,

        purpose:
            purpose,

        status:
            "Scheduled"

    });



    closeModal(
        "appointmentModal"
    );



    document.getElementById(
        "appointmentDate"
    ).value = "";


    document.getElementById(
        "appointmentTime"
    ).value = "";


    document.getElementById(
        "appointmentPurpose"
    ).value = "";



    updateAll();

}



/* =====================================================
   PATIENT REGISTRATION
===================================================== */

function openRegistrationForm() {

    document
        .getElementById(
            "registrationModal"
        )
        .classList
        .remove("hidden");

}



/* =====================================================
   REGISTER PATIENT
===================================================== */

function registerPatient() {

    const id =
        document
            .getElementById(
                "registerPatientId"
            )
            .value
            .trim();


    const name =
        document
            .getElementById(
                "registerPatientName"
            )
            .value
            .trim();


    const age =
        Number(
            document
                .getElementById(
                    "registerPatientAge"
                )
                .value
        );


    const contact =
        document
            .getElementById(
                "registerPatientContact"
            )
            .value
            .trim();


    const username =
        document
            .getElementById(
                "registerUsername"
            )
            .value
            .trim();


    const password =
        document
            .getElementById(
                "registerPassword"
            )
            .value;



    /* =================================================
       VALIDATION
    ================================================== */

    if (

        id === ""

        ||

        name === ""

        ||

        age <= 0

        ||

        contact === ""

        ||

        username === ""

        ||

        password === ""

    ) {

        alert(
            "Please complete all registration fields."
        );

        return;
    }



    /* =================================================
       CHECK PATIENT ID
    ================================================== */

    const existingPatient =
        patients.find(

            function(patient) {

                return (
                    patient.id === id
                );

            }

        );


    if (existingPatient) {

        alert(
            "Patient ID already exists."
        );

        return;
    }



    /* =================================================
       CHECK USERNAME
    ================================================== */

    const existingUsername =
        patients.find(

            function(patient) {

                return (
                    patient.username ===
                    username
                );

            }

        );


    if (existingUsername) {

        alert(
            "Username already exists."
        );

        return;
    }



    /* =================================================
       CREATE PATIENT
    ================================================== */

    const newPatient = {

        id:
            id,

        name:
            name,

        age:
            age,

        contact:
            contact,

        username:
            username,

        password:
            password

    };



    /* Add patient */

    patients.push(
        newPatient
    );



    /* =================================================
       SAVE PATIENT

       This is the important part.

       The same patient list is used by:

       PATIENT REGISTRATION
              ↓
       localStorage
              ↓
       RHU PATIENT RECORDS
    ================================================== */

    localStorage.setItem(

        "vaxbalancePatients",

        JSON.stringify(
            patients
        )

    );



    /* =================================================
       CLOSE REGISTRATION FORM
    ================================================== */

    closeModal(
        "registrationModal"
    );



    /* =================================================
       CLEAR FORM
    ================================================== */

    document.getElementById(
        "registerPatientId"
    ).value = "";


    document.getElementById(
        "registerPatientName"
    ).value = "";


    document.getElementById(
        "registerPatientAge"
    ).value = "";


    document.getElementById(
        "registerPatientContact"
    ).value = "";


    document.getElementById(
        "registerUsername"
    ).value = "";


    document.getElementById(
        "registerPassword"
    ).value = "";



    /* =================================================
       SUCCESS MESSAGE
    ================================================== */

    alert(

        "Registration successful!\n\n" +

        "Your patient account has been created.\n\n" +

        "You can now log in using your username and password."

    );



    updateAll();

}



/* =====================================================
   MODAL
===================================================== */

function closeModal(id) {

    document
        .getElementById(id)
        .classList
        .add("hidden");

}



/* =====================================================
   REPORTS
===================================================== */

function updateReports() {

    const totalStock =
        inventory.reduce(

            function(
                total,
                item
            ) {

                return (
                    total +
                    item.quantity
                );

            },

            0

        );


    const lowStock =
        getLowStockItems()
            .length;


    const expiring =
        getExpiringItems()
            .length;



    document.getElementById(
        "reportTotalStock"
    ).textContent =
        totalStock;


    document.getElementById(
        "reportLowStock"
    ).textContent =
        lowStock;


    document.getElementById(
        "reportExpiring"
    ).textContent =
        expiring;


    document.getElementById(
        "reportPatients"
    ).textContent =
        patients.length;


    document.getElementById(
        "reportAppointments"
    ).textContent =
        rhuAppointments.length;

}



/* =====================================================
   UPDATE EVERYTHING
===================================================== */

function updateAll() {

    renderImmunizationRecords();

    renderSchedule();

    renderAppointments();

    renderInventory();

    renderPatients();

    renderRhuAppointments();

    updatePatientDashboard();

    updateRhuDashboard();

    updateReports();

}



/* =====================================================
   INITIALIZE SYSTEM
===================================================== */

updateAll();