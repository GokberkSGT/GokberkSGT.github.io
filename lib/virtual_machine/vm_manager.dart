import 'dart:async';

class VirtualMachine {
  final String id;
  final String name;
  bool isRunning;
  int memoryAllocation;
  int cpuCores;

  VirtualMachine({
    required this.id,
    required this.name,
    this.isRunning = false,
    this.memoryAllocation = 1024,
    this.cpuCores = 1,
  });
}

class VMManager {
  final Map<String, VirtualMachine> _vms = {};

  // Create a new virtual machine
  VirtualMachine createVM({
    required String name,
    int memoryMB = 1024,
    int cpuCores = 1,
  }) {
    final id = DateTime.now().millisecondsSinceEpoch.toString();
    final vm = VirtualMachine(
      id: id,
      name: name,
      memoryAllocation: memoryMB,
      cpuCores: cpuCores,
    );
    _vms[id] = vm;
    return vm;
  }

  // Start a virtual machine
  Future<bool> startVM(String id) async {
    final vm = _vms[id];
    if (vm == null) return false;

    try {
      // Simulate VM startup
      await Future.delayed(const Duration(seconds: 2));
      vm.isRunning = true;
      return true;
    } catch (e) {
      return false;
    }
  }

  // Stop a virtual machine
  Future<bool> stopVM(String id) async {
    final vm = _vms[id];
    if (vm == null) return false;

    try {
      // Simulate VM shutdown
      await Future.delayed(const Duration(seconds: 1));
      vm.isRunning = false;
      return true;
    } catch (e) {
      return false;
    }
  }

  // Get VM status
  VirtualMachine? getVMStatus(String id) {
    return _vms[id];
  }

  // List all VMs
  List<VirtualMachine> listVMs() {
    return _vms.values.toList();
  }

  // Delete a VM
  bool deleteVM(String id) {
    if (!_vms.containsKey(id)) return false;
    if (_vms[id]!.isRunning) return false;
    
    _vms.remove(id);
    return true;
  }
} 