import React, { useState } from 'react';
import Popup from './Popup';
import { Formik } from 'formik';
import * as Yup from 'yup';

import './Application.css';

const Application = () => {
	const initialValues = {
		userName: '',
		email: '',
		password: '',
		rank: '',
		regulations: false,
	};

	const validationSchema = Yup.object({
		userName: Yup.string().min(3, 'error').required('Required'),
		email: Yup.string()
			.email('Your mail must have "@", example: test@test.com')
			.required('Required'),
		password: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),
		rank: Yup.string()
			.oneOf([
				'junior developer',
				'mid/regular developer',
				'senior developer',
				'boss',
				'other',
			])
			.required('Required'),
		regulations: Yup.boolean()
			.required('Required')
			.oneOf([true], 'You must accept the regulations!'),
	});

	const [formSubmitted, setFormSubmitted] = useState(false);

	const handleFormSubmit = (values, { setSubmitting, resetForm }) => {
		setSubmitting(false);
		if (values.lenght !== 0) {
			setFormSubmitted(true);
			resetForm();
		}
	};

	return (
		<div>
			<h1 className='title-app'>Validation form!</h1>
			{formSubmitted ? (
				<Popup setFormSubmitted={setFormSubmitted} />
			) : (
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleFormSubmit}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
					}) => (
						<form className='box-form' onSubmit={handleSubmit}>
							<input
								className='input-style'
								placeholder='Username'
								type='text'
								name='userName'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.userName}
							/>
							{errors.userName && touched.userName && (
								<div className='error-msg'>{errors.userName}</div>
							)}
							<input
								className='input-style'
								placeholder='Email'
								type='email'
								name='email'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
							/>
							{errors.email && touched.email && (
								<div className='error-msg'>{errors.email}</div>
							)}
							<input
								className='input-style'
								placeholder='Password'
								type='password'
								name='password'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
							/>
							{errors.password && touched.password && (
								<div className='error-msg'>{errors.password}</div>
							)}
							<select
								className='select-style'
								name='rank'
								value={values.rank}
								onChange={handleChange}
								onBlur={handleBlur}
							>
								<option value='' disabled>
									Select a rank
								</option>
								<option value='junior developer'>Junior Developer</option>
								<option value='mid/regular developer'>
									Mid/Regular Developer
								</option>
								<option value='senior developer'>Senior Developer</option>
								<option value='boss'>Boss</option>
								<option value='other'>Other</option>
							</select>
							{errors.rank && touched.rank && (
								<div className='error-msg'>{errors.rank}</div>
							)}
							<label>
								<input
									className='input-style'
									type='checkbox'
									value={values.regulations}
									name='regulations'
									onChange={handleChange}
									onBlur={handleBlur}
									checked={values.regulations}
								/>{' '}
								Accept regulations!
							</label>
							{errors.regulations && touched.regulations && (
								<div className='error-msg'>{errors.regulations}</div>
							)}
							<button className='btn' type='submit'>
								Submit
							</button>
						</form>
					)}
				</Formik>
			)}
		</div>
	);
};

export default Application;
