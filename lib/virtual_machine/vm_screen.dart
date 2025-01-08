import 'package:flutter/material.dart';
import 'vm_manager.dart';

class VMScreen extends StatefulWidget {
  const VMScreen({super.key});

  @override
  State<VMScreen> createState() => _VMScreenState();
}

class _VMScreenState extends State<VMScreen> {
  final VMManager _vmManager = VMManager();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _memoryController = TextEditingController(text: '1024');
  final TextEditingController _cpuController = TextEditingController(text: '1');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sanal Makine Platformu'),
        backgroundColor: Colors.blue,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Card(
              elevation: 4,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Yeni Sanal Makine Oluştur',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: _nameController,
                      decoration: const InputDecoration(
                        labelText: 'Sanal Makine Adı',
                        border: OutlineInputBorder(),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Expanded(
                          child: TextField(
                            controller: _memoryController,
                            decoration: const InputDecoration(
                              labelText: 'Bellek (MB)',
                              border: OutlineInputBorder(),
                            ),
                            keyboardType: TextInputType.number,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: TextField(
                            controller: _cpuController,
                            decoration: const InputDecoration(
                              labelText: 'CPU Çekirdek Sayısı',
                              border: OutlineInputBorder(),
                            ),
                            keyboardType: TextInputType.number,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: () {
                        final vm = _vmManager.createVM(
                          name: _nameController.text,
                          memoryMB: int.tryParse(_memoryController.text) ?? 1024,
                          cpuCores: int.tryParse(_cpuController.text) ?? 1,
                        );
                        setState(() {});
                        _nameController.clear();
                      },
                      child: const Text('Oluştur'),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            const Text(
              'Mevcut Sanal Makineler',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: ListView.builder(
                itemCount: _vmManager.listVMs().length,
                itemBuilder: (context, index) {
                  final vm = _vmManager.listVMs()[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 8),
                    child: ListTile(
                      title: Text(vm.name),
                      subtitle: Text(
                        'Bellek: ${vm.memoryAllocation}MB, CPU: ${vm.cpuCores} çekirdek',
                      ),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            vm.isRunning ? 'Çalışıyor' : 'Durdu',
                            style: TextStyle(
                              color: vm.isRunning ? Colors.green : Colors.red,
                            ),
                          ),
                          const SizedBox(width: 8),
                          IconButton(
                            icon: Icon(
                              vm.isRunning ? Icons.stop : Icons.play_arrow,
                              color: vm.isRunning ? Colors.red : Colors.green,
                            ),
                            onPressed: () async {
                              if (vm.isRunning) {
                                await _vmManager.stopVM(vm.id);
                              } else {
                                await _vmManager.startVM(vm.id);
                              }
                              setState(() {});
                            },
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete, color: Colors.grey),
                            onPressed: vm.isRunning
                                ? null
                                : () {
                                    _vmManager.deleteVM(vm.id);
                                    setState(() {});
                                  },
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _nameController.dispose();
    _memoryController.dispose();
    _cpuController.dispose();
    super.dispose();
  }
} 