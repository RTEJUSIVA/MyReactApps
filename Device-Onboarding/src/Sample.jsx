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