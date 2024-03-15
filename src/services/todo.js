const service = {
  getDefault() {
    return {
      id: Date.now().toString(16) + '_' + Math.ceil(Math.random() * 1000).toString(16),
      text: '123465',
      isEditCell: false,
      status: 'not_started'
    }
  },
  getStatusList() {
    return [
      { id: 'not_started', label: 'Not started' },
      { id: 'in_progress', label: 'In progress' },
      { id: 'completed', label: 'Completed' }
    ]
  },
  validateTodo(item) {
    return item.text.length > 0
  },
  makeCopy(item) {
    return JSON.parse(JSON.stringify(item))
  },
  toggleEditCell(isEditCell) {
    return !isEditCell
  },
  toggleEditCellALL(itemsAll) {
     itemsAll.value.forEach(element => {
      element.isEditCell = false
     });
  },
  toggleStatus(status) {
    switch (status) {
      case 'not_started':
        return 'in_progress'
      case 'in_progress':
        return 'completed'
      case 'completed':
        return 'not_started'
    }
  }
}

export default service
