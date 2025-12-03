import React, { useState, useEffect } from "react";
import samplejson from "../src/sample.json";
import "./App.css";
import {
  Plus,
  Monitor,
  Wifi,
  Server,
  Database,
  Shield,
  Activity,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Edit3,
  Search,
  Filter,
  RefreshCw,
  Download,
  Upload,
} from "lucide-react";
import axios from "axios";

const DeviceOnboardingApp = () => {
  const [devices, setDevices] = useState({});

  const [newDevice, setNewDevice] = useState({
    name: "",
    platform: "dell",
    ip: "",
    username: "",
    password: "",
    host: "",
    role: "leaf",
    status: false,
  });
  const [onboardingStatus, setOnboardingStatus] = useState({});
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [editingDevice, setEditingDevice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const deviceTypes = {
    server: { icon: Server, color: "blue", label: "Server" },
    workstation: { icon: Monitor, color: "green", label: "Workstation" },
    network: { icon: Wifi, color: "purple", label: "Network Device" },
    database: { icon: Database, color: "orange", label: "Database" },
    security: { icon: Shield, color: "red", label: "Security Device" },
  };

  const roles = ["superspine", "spine", "leaf", "generic"];

  const connectionStatus = {
    connected: {
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
      text: "Connected",
    },
    disconnected: {
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-50",
      text: "Disconnected",
    },
  };

  const environments = ["production", "staging", "development", "testing"];
  const [notification, setNotification] = useState(null);
  // Enhanced onboarding simulation with multiple steps
  const onboardDevice = async (hostname, ip) => {
    setOnboardingStatus((prev) => ({ ...prev, [hostname]: "initializing" }));

    const steps = [
      { status: "connecting", duration: 1000 },
      { status: "authenticating", duration: 800 },
      { status: "configuring", duration: 1500 },
      { status: "installing", duration: 1200 },
      { status: "validating", duration: 600 },
    ];

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, step.duration));
      setOnboardingStatus((prev) => ({ ...prev, [hostname]: step.status }));
    }

    // Final result
    const success = Math.random() > 0.15;
    setOnboardingStatus((prev) => ({
      ...prev,
      [hostname]: success ? "completed" : "failed",
    }));
  };

  const addDevice = async () => {
    if (
      newDevice.name &&
      newDevice.ip &&
      newDevice.username &&
      newDevice.password &&
      newDevice.host
    ) {
      try {
        const response = await axios.post("/api/fabric/v1.0.0/NodeProfile", {
          name: newDevice.name,
          platform: newDevice.platform,
          ip: newDevice.ip,
          username: newDevice.username,
          password: newDevice.password,
          host: newDevice.host,
          role: newDevice.role,
          status: newDevice.status,
        });

        setDevices((prev) => ({
          ...prev,
          [newDevice.name]: {
            ip: newDevice.ip,
            host: newDevice.host,
            role: newDevice.role,
            connection: Math.random() > 0.5 ? "connected" : "disconnected",
          },
        }));

        setNewDevice({
          name: "",
          platform: "dell",
          ip: "",
          username: "",
          password: "",
          host: "",
          role: "leaf",
          status: false,
        });

        setShowAddModal(false);
        setNotification({
          type: "success",
          message: "Device added successfully!",
        });
      } catch (error) {
        setNotification({
          type: "error",
          message: "Failed to add device. Please try again.",
        });
      }
    }
  };

  const deleteDevice = (hostname) => {
    setDevices((prev) => {
      const updated = { ...prev };
      delete updated[hostname];
      return updated;
    });
    setOnboardingStatus((prev) => {
      const updated = { ...prev };
      delete updated[hostname];
      return updated;
    });
  };

  const updateDevice = (oldHostname, newHostname, newIp) => {
    setDevices((prev) => {
      const updated = { ...prev };
      delete updated[oldHostname];
      updated[newHostname] = newIp;
      return updated;
    });
    setEditingDevice(null);
  };

  const getDeviceType = (hostname) => {
    if (hostname.includes("server")) return "server";
    if (hostname.includes("workstation") || hostname.includes("dev"))
      return "workstation";
    if (
      hostname.includes("gateway") ||
      hostname.includes("router") ||
      hostname.includes("switch")
    )
      return "network";
    if (hostname.includes("db") || hostname.includes("database"))
      return "database";
    if (hostname.includes("security") || hostname.includes("firewall"))
      return "security";
    return "server";
  };

  const getStatusConfig = (status) => {
    const configs = {
      initializing: {
        icon: RefreshCw,
        color: "text-blue-500",
        bg: "bg-blue-50",
        text: "Initializing",
        animate: true,
      },
      connecting: {
        icon: Activity,
        color: "text-yellow-500",
        bg: "bg-yellow-50",
        text: "Connecting",
        animate: true,
      },
      authenticating: {
        icon: Shield,
        color: "text-purple-500",
        bg: "bg-purple-50",
        text: "Authenticating",
        animate: true,
      },
      configuring: {
        icon: RefreshCw,
        color: "text-blue-500",
        bg: "bg-blue-50",
        text: "Configuring",
        animate: true,
      },
      installing: {
        icon: Download,
        color: "text-indigo-500",
        bg: "bg-indigo-50",
        text: "Installing",
        animate: true,
      },
      validating: {
        icon: CheckCircle2,
        color: "text-green-500",
        bg: "bg-green-50",
        text: "Validating",
        animate: true,
      },
      completed: {
        icon: CheckCircle2,
        color: "text-green-600",
        bg: "bg-green-50",
        text: "Completed",
        animate: false,
      },
      failed: {
        icon: XCircle,
        color: "text-red-500",
        bg: "bg-red-50",
        text: "Failed",
        animate: false,
      },
    };
    return (
      configs[status] || {
        icon: Clock,
        color: "text-gray-500",
        bg: "bg-gray-50",
        text: "Ready",
        animate: false,
      }
    );
  };

  const filteredDevices = Object.entries(devices).filter(
    ([hostname, deviceData]) => {
      const matchesSearch =
        hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deviceData.ip.includes(searchTerm);
      const matchesFilter =
        filterType === "all" || deviceData.role === filterType;
      return matchesSearch && matchesFilter;
    }
  );

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Device Manager
                  </h1>
                  <p className="text-sm text-gray-500">
                    Device Onboarding & Configuration
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-6 py-8">
        {/* Device Management */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Device Inventory
              </h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search devices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="all">All Roles</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Device
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Host
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Connection
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDevices.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="p-4 bg-gray-50 rounded-full">
                          <Plus className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="text-gray-500">
                          <p className="text-lg font-medium">
                            No devices found
                          </p>
                          <p className="text-sm">
                            Click "Add Device" to get started
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredDevices.map(([hostname, deviceData]) => {
                    const connectionState =
                      deviceData.connection || "disconnected";
                    const connectionConfig = connectionStatus[connectionState];
                    const ConnectionIcon = connectionConfig.icon;

                    return (
                      <tr
                        key={hostname}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="p-2 rounded-full bg-blue-50 mr-3">
                              <Server className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {hostname}
                              </div>
                              <div className="text-sm text-gray-500">
                                Device ID: {hostname.toUpperCase()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-mono">
                            {deviceData.ip}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {deviceData.host}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {deviceData.role
                              ? deviceData.role.charAt(0).toUpperCase() +
                                deviceData.role.slice(1)
                              : "Leaf"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`p-1 rounded-full ${connectionConfig.bg} mr-2`}
                            >
                              <ConnectionIcon
                                className={`w-4 h-4 ${connectionConfig.color}`}
                              />
                            </div>
                            <span className="text-sm text-gray-900">
                              {connectionConfig.text}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => setEditingDevice(hostname)}
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                              title="Edit device"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteDevice(hostname)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                              title="Delete device"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Add New Device
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newDevice.name}
                    onChange={(e) =>
                      setNewDevice((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., chennai-v10-rack1-leaf-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform
                  </label>
                  <input
                    type="text"
                    value={newDevice.platform}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IP Address
                  </label>
                  <input
                    type="text"
                    value={newDevice.ip}
                    onChange={(e) =>
                      setNewDevice((prev) => ({ ...prev, ip: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="192.168.100.55"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={newDevice.username}
                    onChange={(e) =>
                      setNewDevice((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="admin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newDevice.password}
                    onChange={(e) =>
                      setNewDevice((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Host
                  </label>
                  <input
                    type="text"
                    value={newDevice.host}
                    onChange={(e) =>
                      setNewDevice((prev) => ({
                        ...prev,
                        host: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="leaf2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={newDevice.role}
                    onChange={(e) =>
                      setNewDevice((prev) => ({
                        ...prev,
                        role: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addDevice}
                disabled={
                  !newDevice.name ||
                  !newDevice.ip ||
                  !newDevice.username ||
                  !newDevice.password ||
                  !newDevice.host
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Add Device
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`px-4 py-3 rounded-md shadow-lg ${
              notification.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-center">
              {notification.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mr-2" />
              )}
              <span
                className={`text-sm font-medium ${
                  notification.type === "success"
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {notification.message}
              </span>
              <button
                onClick={() => setNotification(null)}
                className="ml-4 text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceOnboardingApp;
