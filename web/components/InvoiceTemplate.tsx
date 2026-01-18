import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';

interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
  amount: number;
}

interface InvoiceTemplateProps {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  taxPercent: number;
  taxAmount: number;
  total: number;
  companyName?: string;
  companyLogo?: string;
  notes?: string;
  onDownloadPDF?: () => void;
  onSendEmail?: () => void;
}

export const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({
  invoiceNumber,
  date,
  dueDate,
  customerName,
  customerEmail,
  customerPhone,
  customerAddress,
  items,
  subtotal,
  taxPercent,
  taxAmount,
  total,
  companyName = 'My Company Name',
  companyLogo,
  notes = 'Thank you for your business!',
  onDownloadPDF,
  onSendEmail,
}) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoSection}>
          {companyLogo ? (
            <Image source={{ uri: companyLogo }} style={styles.logo} />
          ) : (
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>Logo</Text>
            </View>
          )}
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{companyName}</Text>
            <Text style={styles.companyTagline}>My company tagline</Text>
          </View>
        </View>

        <View style={styles.invoiceTitle}>
          <Text style={styles.invoiceTitleText}>Invoice</Text>
        </View>
      </View>

      {/* Invoice Details */}
      <View style={styles.invoiceDetailsSection}>
        <View style={styles.invoiceNumberBox}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Invoice #</Text>
            <Text style={styles.value}>{invoiceNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Invoice Date</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Due Date</Text>
            <Text style={styles.value}>{dueDate}</Text>
          </View>
        </View>
      </View>

      {/* Customer & Company Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BILL TO</Text>
          <Text style={styles.customerName}>{customerName}</Text>
          <Text style={styles.customerDetail}>Email: {customerEmail}</Text>
          <Text style={styles.customerDetail}>Phone: {customerPhone}</Text>
          <Text style={styles.customerDetail}>Address: {customerAddress}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FROM</Text>
          <Text style={styles.customerName}>{companyName}</Text>
          <Text style={styles.customerDetail}>Contact your company details here</Text>
        </View>
      </View>

      {/* Items Table Header */}
      <View style={styles.tableHeaderContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Serial</Text>
          <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Description</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Qty</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>Unit Price</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Amount</Text>
        </View>
      </View>

      {/* Items */}
      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>{String(index + 1).padStart(5, '0')}</Text>
            <Text style={[styles.tableCell, { flex: 3 }]}>{item.description}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{item.qty}</Text>
            <Text style={[styles.tableCell, { flex: 1.2 }]}>₹ {item.unitPrice.toFixed(2)}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>₹ {item.amount.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Empty rows for spacing */}
      <View style={styles.emptyRowsContainer}>
        {[...Array(3)].map((_, i) => (
          <View key={`empty-${i}`} style={styles.emptyRow} />
        ))}
      </View>

      {/* Totals Section */}
      <View style={styles.totalsContainer}>
        <View style={styles.totalsLeft}>
          <Text style={styles.totalsLabel}>Notes or extra information:</Text>
          <Text style={styles.notesText}>{notes}</Text>
        </View>

        <View style={styles.totalsRight}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>₹ {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax ({taxPercent}%):</Text>
            <Text style={styles.totalValue}>₹ {taxAmount.toFixed(2)}</Text>
          </View>
          <View style={[styles.totalRow, styles.grandTotalRow]}>
            <Text style={styles.grandTotalLabel}>Total:</Text>
            <Text style={styles.grandTotalValue}>₹ {total.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Printed or viewed locally in My Company name</Text>
        <Text style={styles.footerText}>Thank you for your business!</Text>
        <Text style={styles.footerContact}>
          123 Street, YourCity, Country, YZ 12345 {'\n'}
          Tel +1-XXX-XXX-XXXX Fax XXX-XXXX E-mail: info@yourcompany.com Web: www.yourcompany.com
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        {onDownloadPDF && (
          <Pressable style={styles.actionButton} onPress={onDownloadPDF}>
            <Text style={styles.actionButtonText}>📥 Download PDF</Text>
          </Pressable>
        )}
        {onSendEmail && (
          <Pressable style={[styles.actionButton, styles.secondaryButton]} onPress={onSendEmail}>
            <Text style={styles.actionButtonText}>✉️ Send Email</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logoSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  companyTagline: {
    fontSize: 12,
    color: '#666',
  },
  invoiceTitle: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  invoiceTitleText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  invoiceDetailsSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  invoiceNumberBox: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  value: {
    fontSize: 12,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  section: {
    gap: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D4ED8',
    backgroundColor: '#e3f2fd',
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 3,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  customerDetail: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  tableHeaderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 0,
    backgroundColor: '#1D4ED8',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#1D4ED8',
    gap: 8,
  },
  tableHeaderCell: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  itemsContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    gap: 8,
  },
  tableCell: {
    fontSize: 11,
    color: '#333',
  },
  emptyRowsContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  emptyRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  totalsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    gap: 20,
  },
  totalsLeft: {
    flex: 1,
  },
  totalsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1D4ED8',
    marginBottom: 8,
  },
  notesText: {
    fontSize: 11,
    color: '#666',
    lineHeight: 16,
  },
  totalsRight: {
    width: 180,
    gap: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 11,
    color: '#666',
  },
  totalValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  grandTotalRow: {
    borderBottomWidth: 2,
    borderBottomColor: '#1D4ED8',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    marginTop: 4,
  },
  grandTotalLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  grandTotalValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  footerContact: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1D4ED8',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#64B5F6',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
});
