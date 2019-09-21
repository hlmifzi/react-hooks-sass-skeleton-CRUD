import React, { useState, Fragment } from 'react'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import UserTable from './tables/UserTable'

const App = () => {
	// Data
	const usersData = [
		{ id: 1, name: 'Tania', username: 'floppydiskette', image: 'https://pngimage.net/wp-content/uploads/2018/06/react-icon-png-7.png' },
		{ id: 2, name: 'Craig', username: 'siliconeidolon', image: 'https://pngimage.net/wp-content/uploads/2018/06/react-icon-png-7.png' },
		{ id: 3, name: 'Ben', username: 'benisphere', image: 'https://pngimage.net/wp-content/uploads/2018/06/react-icon-png-7.png' },
	]

	const initialFormState = { id: null, name: '', username: '' }

	// Setting state
	const [users, setUsers] = useState(usersData)
	const [currentUser, setCurrentUser] = useState(initialFormState)
	const [editing, setEditing] = useState(false)

	// CRUD operations
	const addUser = user => {
		user.id = users.length + 1
		setUsers([...users, user])
	}

	const deleteUser = id => {
		setEditing(false)

		setUsers(users.filter(user => user.id !== id))
	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}

	const editRow = user => {
		setEditing(true)

		setCurrentUser({ id: user.id, name: user.name, username: user.username })
	}

	return (
		<div className="container">
			<h1>CRUD App with Hooks</h1>
			<div class="ph-item">
				<div class="ph-col-12">
					<div class="ph-picture"></div>
					<div class="ph-row">
						<div class="ph-col-6 big"></div>
						<div class="ph-col-4 empty big"></div>
						<div class="ph-col-2 big"></div>
						<div class="ph-col-4"></div>
						<div class="ph-col-8 empty"></div>
						<div class="ph-col-6"></div>
						<div class="ph-col-6 empty"></div>
						<div class="ph-col-12"></div>
					</div>
				</div>

			</div>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
							<Fragment>
								<h2>Add user</h2>
								<AddUserForm addUser={addUser} />
							</Fragment>
						)}
				</div>
				<div className="flex-large">
					<h2>View users</h2>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
}

export default App
