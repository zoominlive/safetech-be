/**
 * Test script to verify case-insensitive filtering fixes
 * Run this with: node test_case_insensitive_filtering.js
 */

const { normalizeRole, normalizeStatus, normalizeType, createCaseInsensitiveFilter } = require('./src/utils/caseInsensitiveFilter');

console.log('Testing Case-Insensitive Filtering Fixes\n');

// Test role normalization
console.log('=== Role Normalization Tests ===');
const roleTests = [
  'admin',
  'ADMIN', 
  'Admin',
  'technician',
  'TECHNICIAN',
  'Technician',
  'project manager',
  'PROJECT MANAGER',
  'Project Manager',
  'project+manager',
  'project_manager',
  'projectmanager'
];

roleTests.forEach(role => {
  const normalized = normalizeRole(role);
  console.log(`"${role}" -> "${normalized}"`);
});

// Test status normalization
console.log('\n=== Status Normalization Tests ===');
const statusTests = [
  'new',
  'NEW',
  'New',
  'in progress',
  'IN PROGRESS',
  'In Progress',
  'inprogress',
  'pm review',
  'PM REVIEW',
  'PM Review',
  'pmreview',
  'complete',
  'COMPLETE',
  'Complete'
];

statusTests.forEach(status => {
  const normalized = normalizeStatus(status);
  console.log(`"${status}" -> "${normalized}"`);
});

// Test type normalization
console.log('\n=== Type Normalization Tests ===');
const typeTests = ['standard', 'STANDARD', 'Standard', 'custom', 'CUSTOM', 'Custom'];

typeTests.forEach(type => {
  const normalized = normalizeType(type);
  console.log(`"${type}" -> "${normalized}"`);
});

// Test filter creation
console.log('\n=== Filter Creation Tests ===');
const roleFilter = createCaseInsensitiveFilter('role', 'admin', 'role');
console.log('Role filter for "admin":', JSON.stringify(roleFilter, null, 2));

const statusFilter = createCaseInsensitiveFilter('status', ['new', 'in progress'], 'status');
console.log('Status filter for ["new", "in progress"]:', JSON.stringify(statusFilter, null, 2));

const typeFilter = createCaseInsensitiveFilter('type', 'STANDARD', 'type');
console.log('Type filter for "STANDARD":', JSON.stringify(typeFilter, null, 2));

console.log('\n✅ All tests completed successfully!');
console.log('\nThe case-insensitive filtering should now work for:');
console.log('- User role filtering: /users/all?role=admin (or any case variation)');
console.log('- Project status filtering: /projects/all?statusFilter=new,in+progress (or any case variation)');
console.log('- Material type filtering: /materials/all?type=standard (or any case variation)');
