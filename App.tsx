import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  RefreshControl,
  Platform,
} from "react-native";
import {
  Provider as PaperProvider,
  Text,
  Button,
  TextInput,
  Card,
  Title,
  Paragraph,
  Chip,
  DataTable,
  FAB,
  Portal,
  Modal,
  Divider,
  ActivityIndicator,
  Snackbar,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface User {
  id: string;
  email: string;
  role: "admin" | "owner" | "member";
  clerkId: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  error?: string;
  details?: any[];
}

function AppContent() {
  const insets = useSafeAreaInsets();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [healthStatus, setHealthStatus] = useState<
    "checking" | "healthy" | "unhealthy"
  >("checking");
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    role: "member" as "admin" | "owner" | "member",
    clerkId: "",
  });

  // Use localhost for iOS simulator, 10.0.2.2 for Android emulator
  const API_BASE_URL =
    Platform.OS === "android"
      ? "http://10.0.2.2:3000/api/test-db"
      : "http://localhost:3000/api/test-db";

  // Health check function
  const checkApiHealth = async () => {
    setHealthStatus("checking");
    try {
      const response = await fetch(API_BASE_URL);
      if (response.ok) {
        setHealthStatus("healthy");
        setError(null);
      } else {
        setHealthStatus("unhealthy");
        setError(`API responded with status: ${response.status}`);
      }
    } catch (err) {
      setHealthStatus("unhealthy");
      setError(
        "Network error: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      const result: ApiResponse<User[]> = await response.json();

      if (result.success && result.data) {
        setUsers(result.data);
      } else {
        setError(result.error || "Failed to fetch users");
      }
    } catch (err) {
      setError(
        "Network error: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  // Create user
  const createUser = async () => {
    if (!formData.email || !formData.clerkId) {
      setError("Email and Clerk ID are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result: ApiResponse<User> = await response.json();

      if (result.success && result.data) {
        setUsers((prev) => [...prev, result.data!]);
        setFormData({ email: "", role: "member", clerkId: "" });
        setModalVisible(false);
        setError(null);
      } else {
        setError(result.error || "Failed to create user");
      }
    } catch (err) {
      setError(
        "Network error: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  // Update user
  const updateUser = async () => {
    if (!editingId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}?id=${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result: ApiResponse<User> = await response.json();

      if (result.success && result.data) {
        setUsers((prev) =>
          prev.map((user) => (user.id === editingId ? result.data! : user))
        );
        setFormData({ email: "", role: "member", clerkId: "" });
        setEditingId(null);
        setModalVisible(false);
        setError(null);
      } else {
        setError(result.error || "Failed to update user");
      }
    } catch (err) {
      setError(
        "Network error: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id: string) => {
    Alert.alert("Delete User", "Are you sure you want to delete this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          setError(null);

          try {
            const response = await fetch(`${API_BASE_URL}?id=${id}`, {
              method: "DELETE",
            });

            const result: ApiResponse<User> = await response.json();

            if (result.success) {
              setUsers((prev) => prev.filter((user) => user.id !== id));
              setError(null);
            } else {
              setError(result.error || "Failed to delete user");
            }
          } catch (err) {
            setError(
              "Network error: " +
                (err instanceof Error ? err.message : "Unknown error")
            );
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  // Start editing user
  const startEdit = (user: User) => {
    setFormData({
      email: user.email,
      role: user.role,
      clerkId: user.clerkId,
    });
    setEditingId(user.id);
    setModalVisible(true);
  };

  // Cancel editing
  const cancelEdit = () => {
    setFormData({ email: "", role: "member", clerkId: "" });
    setEditingId(null);
    setModalVisible(false);
  };

  // Handle refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([checkApiHealth(), fetchUsers()]);
    setRefreshing(false);
  };

  // Load users on component mount
  useEffect(() => {
    checkApiHealth();
    fetchUsers();
  }, []);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "#dc2626";
      case "owner":
        return "#ca8a04";
      case "member":
        return "#16a34a";
      default:
        return "#6b7280";
    }
  };

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            },
          ]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.header}>
            <Title style={styles.title}>Club Link Mobile - API Test</Title>
            <Paragraph style={styles.subtitle}>
              Test database connectivity and CRUD operations
            </Paragraph>
          </View>

          {/* Health Check Section */}
          <Card style={styles.card}>
            <Card.Content>
              <Title>API Health Check</Title>
              <View style={styles.healthContainer}>
                <View style={styles.healthStatus}>
                  <View
                    style={[
                      styles.healthIndicator,
                      {
                        backgroundColor:
                          healthStatus === "checking"
                            ? "#fbbf24"
                            : healthStatus === "healthy"
                              ? "#34d399"
                              : "#f87171",
                      },
                    ]}
                  />
                  <Text style={styles.healthText}>
                    {healthStatus === "checking"
                      ? "Checking..."
                      : healthStatus === "healthy"
                        ? "API Healthy"
                        : "API Unhealthy"}
                  </Text>
                </View>
                <Button
                  mode="outlined"
                  onPress={checkApiHealth}
                  disabled={loading}
                >
                  Check Health
                </Button>
              </View>
            </Card.Content>
          </Card>

          {/* Connection Status */}
          <Card style={styles.card}>
            <Card.Content>
              <Title>Connection Status</Title>
              <View style={styles.statusGrid}>
                <View style={styles.statusItem}>
                  <Text style={styles.statusLabel}>API Server</Text>
                  <Text style={styles.statusValue}>{API_BASE_URL}</Text>
                </View>
                <View style={styles.statusItem}>
                  <Text style={styles.statusLabel}>Status</Text>
                  <Text
                    style={[
                      styles.statusValue,
                      {
                        color:
                          healthStatus === "healthy"
                            ? "#16a34a"
                            : healthStatus === "unhealthy"
                              ? "#dc2626"
                              : "#ca8a04",
                      },
                    ]}
                  >
                    {healthStatus === "healthy"
                      ? "Connected"
                      : healthStatus === "unhealthy"
                        ? "Disconnected"
                        : "Checking..."}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Users List */}
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.usersHeader}>
                <Title>Users ({users.length})</Title>
                <Button
                  mode="contained"
                  onPress={() => setModalVisible(true)}
                  disabled={healthStatus !== "healthy"}
                  icon="plus"
                >
                  Add User
                </Button>
              </View>

              {loading && !refreshing ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" />
                  <Text>Loading users...</Text>
                </View>
              ) : users.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    No users found. Create your first user!
                  </Text>
                </View>
              ) : (
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Email</DataTable.Title>
                    <DataTable.Title>Role</DataTable.Title>
                    <DataTable.Title>Actions</DataTable.Title>
                  </DataTable.Header>

                  {users.map((user) => (
                    <DataTable.Row key={user.id}>
                      <DataTable.Cell>
                        <Text style={styles.userEmail}>{user.email}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Chip
                          textStyle={{ color: "white" }}
                          style={{ backgroundColor: getRoleColor(user.role) }}
                        >
                          {user.role}
                        </Chip>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <View style={styles.actionButtons}>
                          <Button
                            mode="text"
                            onPress={() => startEdit(user)}
                            icon="pencil"
                            compact
                          >
                            Edit
                          </Button>
                          <Button
                            mode="text"
                            onPress={() => deleteUser(user.id)}
                            icon="delete"
                            compact
                            textColor="#dc2626"
                          >
                            Delete
                          </Button>
                        </View>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              )}
            </Card.Content>
          </Card>

          {/* Error Display */}
          {error && (
            <Card style={[styles.card, styles.errorCard]}>
              <Card.Content>
                <Title style={styles.errorTitle}>Error</Title>
                <Text style={styles.errorText}>{error}</Text>
              </Card.Content>
            </Card>
          )}
        </ScrollView>

        {/* Add/Edit User Modal */}
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={[
              styles.modal,
              {
                marginTop: insets.top + 20,
                marginBottom: insets.bottom + 20,
                marginLeft: Math.max(insets.left + 20, 20),
                marginRight: Math.max(insets.right + 20, 20),
              },
            ]}
          >
            <Title style={styles.modalTitle}>
              {editingId ? "Edit User" : "Create New User"}
            </Title>

            <TextInput
              label="Email"
              value={formData.email}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, email: text }))
              }
              mode="outlined"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              label="Clerk ID"
              value={formData.clerkId}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, clerkId: text }))
              }
              mode="outlined"
              style={styles.input}
              autoCapitalize="none"
            />

            <View style={styles.roleContainer}>
              <Text style={styles.roleLabel}>Role:</Text>
              <View style={styles.roleButtons}>
                {(["member", "owner", "admin"] as const).map((role) => (
                  <Button
                    key={role}
                    mode={formData.role === role ? "contained" : "outlined"}
                    onPress={() => setFormData((prev) => ({ ...prev, role }))}
                    style={styles.roleButton}
                  >
                    {role}
                  </Button>
                ))}
              </View>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.modalActions}>
              <Button
                mode="outlined"
                onPress={cancelEdit}
                style={styles.modalButton}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={editingId ? updateUser : createUser}
                disabled={loading || !formData.email || !formData.clerkId}
                style={styles.modalButton}
              >
                {loading ? "Processing..." : editingId ? "Update" : "Create"}
              </Button>
            </View>
          </Modal>
        </Portal>

        {/* Snackbar for success messages */}
        <Snackbar
          visible={!!error}
          onDismiss={() => setError(null)}
          style={[
            styles.snackbar,
            {
              bottom: insets.bottom + 10,
            },
          ]}
          action={{
            label: "Dismiss",
            onPress: () => setError(null),
          }}
        >
          {error}
        </Snackbar>
      </SafeAreaView>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AppContent />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginTop: 8,
    opacity: 0.7,
  },
  card: {
    margin: 16,
    elevation: 2,
  },
  healthContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  healthStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  healthIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  healthText: {
    fontSize: 16,
    fontWeight: "500",
  },
  statusGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  statusItem: {
    alignItems: "center",
  },
  statusLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  usersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: "center",
    padding: 40,
  },
  emptyContainer: {
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    opacity: 0.7,
    fontSize: 16,
  },
  userEmail: {
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: "row",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  roleContainer: {
    marginBottom: 16,
  },
  roleLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  roleButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  roleButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  divider: {
    marginVertical: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  errorCard: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
  },
  errorTitle: {
    color: "#dc2626",
  },
  errorText: {
    color: "#dc2626",
  },
  snackbar: {
    marginHorizontal: 16,
  },
});
