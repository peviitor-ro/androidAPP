import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { JobContext } from '../context/JobContext';
import * as WebBrowser from 'expo-web-browser';
import COLORS from '../constants/COLORS';
import Map from '../assets/svg/Map';
import Heart from '../assets/svg/Heart';
import Delete from '../assets/svg/Delete';
import CustomButton from './Buttons';
import React, { useContext } from 'react';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbfbfb',
    borderRadius: 16,
    padding: 16,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.16,
    shadowRadius: 3,
    elevation: 3,
    width: 300,
    minHeight: 260,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  company: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 24,
  },
  metaSection: {
    marginTop: 14,
    gap: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  location: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#f3f4f6',
  },
  remoteBadge: {
    backgroundColor: '#dbeafe',
  },
  salaryBadge: {
    backgroundColor: '#dcfce7',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  remoteText: {
    color: '#1e40af',
  },
  salaryText: {
    color: '#166534',
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: COLORS.background_green,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  saveButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d2e2e4',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonActive: {
    backgroundColor: '#fff7ed',
  },
});

function typeTranslate(type) {
  const typesList = type.split(',');
  return typesList
    .map((t) => {
      switch (t.toLowerCase()) {
        case 'remote':
          return 'Remote';
        case 'hybrid':
          return 'Hibrid';
        case 'on-site':
          return 'La fața locului';
        default:
          return 'Necunoscut';
      }
    })
    .join(', ');
}

function refomatCity(city, county) {
  if (city.includes('all')) {
    return 'Tot Judetul ' + county;
  }
  return city;
}

function formatSalary(job) {
  const { salary_min, salary_max, salary_currency } = job;

  if (salary_min == null && salary_max == null) {
    return null;
  }

  const currency = salary_currency ? ` ${salary_currency}` : '';

  if (salary_min != null && salary_max != null) {
    return `${salary_min} - ${salary_max}${currency}`;
  }

  if (salary_min != null) {
    return `De la ${salary_min}${currency}`;
  }

  return `Până la ${salary_max}${currency}`;
}

export default function Card({ job }) {
  const { savedJobs, addJob, deleteJob } = useContext(JobContext);

  const { id, company_name, job_title, city, county, remote, job_link } =
    job;

  const isSaved = savedJobs.some((j) => j.id === id);
  const salary = formatSalary(job);

  const handleSave = () => {
    if (isSaved) {
      deleteJob(id);
      Alert.alert('Anunțul a fost șters din favorite!');
    } else {
      addJob(job);
      Alert.alert('Anunțul a fost salvat cu succes!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.company} numberOfLines={1} ellipsizeMode="tail">
            {company_name}
          </Text>
          <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">
            {job_title}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSave}
          style={[styles.saveButton, isSaved && styles.saveButtonActive]}
        >
          {isSaved ? <Delete /> : <Heart />}
        </TouchableOpacity>
      </View>

      <View style={styles.metaSection}>
        {city ? (
          <View style={styles.locationRow}>
            <Map />
            <Text style={styles.location} numberOfLines={1}>
              {refomatCity(city, county)}
            </Text>
          </View>
        ) : null}

        <View style={styles.badgeRow}>
          {remote ? (
            <View style={[styles.badge, styles.remoteBadge]}>
              <Text style={[styles.badgeText, styles.remoteText]}>
                {typeTranslate(remote)}
              </Text>
            </View>
          ) : null}

          {salary ? (
            <View style={[styles.badge, styles.salaryBadge]}>
              <Text style={[styles.badgeText, styles.salaryText]}>{salary}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.footer}>
        <CustomButton
          title="Aplică"
          onPress={() => WebBrowser.openBrowserAsync(job_link)}
          style={{
            button: styles.actionButton,
            buttonText: styles.actionButtonText,
          }}
        />
      </View>
    </View>
  );
}
