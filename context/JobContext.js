// context/JobContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '../services/CONSTANTS';
import axios from 'axios';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [savedJobs, setJobs] = useState([]);

  // încarcă joburile la start
  useEffect(() => {
    const loadJobs = async () => {
      const data = await AsyncStorage.getItem('jobs') 
      setJobs(data ? JSON.parse(data) : []);
    };
    loadJobs();
  }, []);

  const saveJobs = async (newJobs) => {
    setJobs(newJobs);
    await AsyncStorage.setItem('jobs', JSON.stringify(newJobs));
  };

  const addJob = async (job) => {
    const newJobs = [...savedJobs, job];
    await saveJobs(newJobs);
  };

  const deleteJob = async (id) => {
    const newJobs = savedJobs.filter((j) => j.id !== id);
    await saveJobs(newJobs);
  };

const syncWithServer = async () => {
  try {
    if (savedJobs.length === 0) return;

    const response = await axios.post(`${CONSTANTS.url}check-saved/`, {
      ids: savedJobs.map((job) => job.id),
    });

    const validIds = response.data.existing_job_ids;

    const newJobs = savedJobs.filter((job) => validIds.includes(job.id));

    // vezi ce se șterge
    const removedJobs = savedJobs.filter((job) => !validIds.includes(job.id));

    if (newJobs.length !== savedJobs.length) {
      await saveJobs(newJobs); // aici doar rescrii lista cu ce rămâne
    }
  } catch (error) {
    console.error('Error syncing jobs with server:', error);
  }
};

  useEffect(() => {
    syncWithServer();
  }, [savedJobs]);

  return (
    <JobContext.Provider value={{ savedJobs, addJob, deleteJob }}>
      {children}
    </JobContext.Provider>
  );
};
export default JobProvider;
