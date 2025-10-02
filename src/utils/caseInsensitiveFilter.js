/**
 * Utility functions for case-insensitive filtering
 */

/**
 * Normalize role input to match enum values
 * @param {string} role - The role string to normalize
 * @returns {string} - Normalized role string
 */
const normalizeRole = (role) => {
  if (!role) return role;
  
  // Normalize separators and casing: convert '+', '_' to spaces, collapse spaces, Title Case
  const titleCased = role
    .toString()
    .toLowerCase()
    .replace(/[+_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Map common variations to correct enum values
  const roleMapping = {
    'Admin': 'Admin',
    'Technician': 'Technician', 
    'Project Manager': 'Project Manager',
    'Projectmanager': 'Project Manager',
    'Project+Manager': 'Project Manager',
    'Project_Manager': 'Project Manager',
    'Projectmanager': 'Project Manager'
  };
  
  return roleMapping[titleCased] || titleCased;
};

/**
 * Normalize status input to match enum values
 * @param {string|string[]} status - The status string or array to normalize
 * @returns {string|string[]} - Normalized status string or array
 */
const normalizeStatus = (status) => {
  if (!status) return status;
  
  const statusMapping = {
    'new': 'New',
    'in progress': 'In Progress',
    'inprogress': 'In Progress',
    'pm review': 'PM Review',
    'pmreview': 'PM Review',
    'complete': 'Complete'
  };
  
  if (Array.isArray(status)) {
    return status.map(s => {
      const lowerStatus = s.toLowerCase();
      return statusMapping[lowerStatus] || s;
    });
  }
  
  const lowerStatus = status.toLowerCase();
  return statusMapping[lowerStatus] || status;
};

/**
 * Normalize type input to match enum values (for materials)
 * @param {string} type - The type string to normalize
 * @returns {string} - Normalized type string
 */
const normalizeType = (type) => {
  if (!type) return type;
  return type.toLowerCase();
};

/**
 * Create case-insensitive filter for enum fields
 * @param {string} field - The field name
 * @param {string|string[]} value - The value to filter by
 * @param {string} fieldType - The type of field ('role', 'status', 'type')
 * @returns {Object} - Sequelize where condition
 */
const createCaseInsensitiveFilter = (field, value, fieldType) => {
  if (!value) return {};
  
  let normalizedValue;
  switch (fieldType) {
    case 'role':
      normalizedValue = normalizeRole(value);
      break;
    case 'status':
      normalizedValue = normalizeStatus(value);
      break;
    case 'type':
      normalizedValue = normalizeType(value);
      break;
    default:
      normalizedValue = value;
  }
  
  if (Array.isArray(normalizedValue)) {
    return { [field]: { [require('sequelize').Op.in]: normalizedValue } };
  }
  
  return { [field]: normalizedValue };
};

module.exports = {
  normalizeRole,
  normalizeStatus,
  normalizeType,
  createCaseInsensitiveFilter
};
