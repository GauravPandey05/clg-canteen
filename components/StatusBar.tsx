import { View, Text, StyleSheet } from 'react-native';
import { Clock, CheckCircle, Package, Utensils } from 'lucide-react-native';

interface StatusBarProps {
  currentStatus: 'placed' | 'preparing' | 'ready' | 'completed';
}

const STATUSES = [
  { key: 'placed', icon: Clock, label: 'Placed' },
  { key: 'preparing', icon: Utensils, label: 'Preparing' },
  { key: 'ready', icon: Package, label: 'Ready' },
  { key: 'completed', icon: CheckCircle, label: 'Completed' },
];

export default function StatusBar({ currentStatus }: StatusBarProps) {
  const getCurrentIndex = () => {
    return STATUSES.findIndex(status => status.key === currentStatus);
  };

  const currentIndex = getCurrentIndex();

  return (
    <View style={styles.container}>
      {STATUSES.map((status, index) => {
        const IconComponent = status.icon;
        const isActive = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <View key={status.key} style={styles.statusItem}>
            <View style={[
              styles.iconContainer,
              isActive && styles.iconContainerActive,
              isCurrent && styles.iconContainerCurrent
            ]}>
              <IconComponent 
                size={16} 
                color={isActive ? '#FFFFFF' : '#8E8E93'} 
              />
            </View>
            <Text style={[
              styles.label,
              isActive && styles.labelActive
            ]}>
              {status.label}
            </Text>
            {index < STATUSES.length - 1 && (
              <View style={[
                styles.connector,
                index < currentIndex && styles.connectorActive
              ]} />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  statusItem: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainerActive: {
    backgroundColor: '#6B8E5A',
  },
  iconContainerCurrent: {
    backgroundColor: '#6B8E5A',
    transform: [{ scale: 1.1 }],
  },
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  labelActive: {
    fontFamily: 'Inter-Medium',
    color: '#6B8E5A',
  },
  connector: {
    position: 'absolute',
    top: 16,
    left: '60%',
    right: '-60%',
    height: 2,
    backgroundColor: '#F2F2F7',
    zIndex: -1,
  },
  connectorActive: {
    backgroundColor: '#6B8E5A',
  },
});